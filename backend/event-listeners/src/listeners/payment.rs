use std::{convert::TryFrom, sync::Arc};

use anyhow::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Event, PaymentEvent, PaymentWorkItem, SubscriberCallbackError};
use infrastructure::database::Repository;
use tracing::instrument;

use super::EventListener;
use crate::models::*;

#[derive(Constructor)]
pub struct Projector {
	payment_request_repository: Arc<dyn Repository<PaymentRequest>>,
	payment_repository: Arc<dyn Repository<Payment>>,
	work_item_repository: Arc<dyn WorkItemRepository>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
	projects_rewarded_users_repository: Arc<dyn ProjectsRewardedUserRepository>,
}

#[async_trait]
impl EventListener<Event> for Projector {
	#[instrument(name = "budget_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Payment(event) = event {
			match event {
				PaymentEvent::Requested {
					id: payment_id,
					project_id,
					requestor_id,
					recipient_id,
					amount,
					reason,
					duration_worked,
					requested_at,
				} => {
					self.payment_request_repository.upsert(PaymentRequest {
						id: payment_id,
						project_id,
						requestor_id,
						recipient_id,
						amount: *amount.amount(),
						currency: amount.currency().try_into()?,
						requested_at,
						invoice_received_at: None,
						hours_worked: i32::try_from(duration_worked.num_hours()).unwrap_or(0),
					})?;

					reason.work_items.into_iter().try_for_each(
						|work_item| -> Result<(), SubscriberCallbackError> {
							let repo_id = match work_item {
								PaymentWorkItem::Issue { repo_id, .. }
								| PaymentWorkItem::CodeReview { repo_id, .. }
								| PaymentWorkItem::PullRequest { repo_id, .. } => repo_id,
							};

							self.work_item_repository.try_insert(
								(project_id, payment_id, recipient_id, work_item).into(),
							)?;

							self.github_repo_index_repository.start_indexing(repo_id)?;
							Ok(())
						},
					)?;

					self.github_user_index_repository.try_insert(GithubUserIndex {
						user_id: recipient_id,
						..Default::default()
					})?;

					self.projects_rewarded_users_repository
						.increase_user_reward_count_for_project(&project_id, &recipient_id)?;
				},
				PaymentEvent::Cancelled { id: payment_id } => {
					let payment_request = self.payment_request_repository.find_by_id(payment_id)?;
					self.payment_request_repository.delete(payment_id)?;
					self.work_item_repository.delete_by_payment_id(payment_id)?;

					self.projects_rewarded_users_repository
						.decrease_user_reward_count_for_project(
							&payment_request.project_id,
							&payment_request.recipient_id,
						)?;
				},
				PaymentEvent::Processed {
					id: payment_id,
					receipt_id,
					amount,
					receipt,
					processed_at,
				} => {
					self.payment_repository.upsert(Payment {
						id: receipt_id,
						amount: *amount.amount(),
						currency_code: amount.currency().to_string(),
						receipt: serde_json::to_value(receipt)
							.map_err(|e| SubscriberCallbackError::Discard(e.into()))?,
						request_id: payment_id,
						processed_at,
					})?;
				},
				PaymentEvent::InvoiceReceived {
					id: payment_id,
					received_at,
				} => {
					let mut payment_request =
						self.payment_request_repository.find_by_id(payment_id)?;
					payment_request.invoice_received_at = Some(received_at);
					self.payment_request_repository.update(payment_request)?;
				},
				PaymentEvent::InvoiceRejected { id: payment_id } => {
					let mut payment_request =
						self.payment_request_repository.find_by_id(payment_id)?;
					payment_request.invoice_received_at = None;
					self.payment_request_repository.update(payment_request)?;
				},
			}
		}
		Ok(())
	}
}
