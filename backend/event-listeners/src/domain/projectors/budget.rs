use std::{convert::TryFrom, sync::Arc};

use anyhow::{anyhow, Result};
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{BudgetEvent, Event, PaymentEvent, ProjectEvent, SubscriberCallbackError};
use infrastructure::database::Repository;
use rust_decimal::{prelude::ToPrimitive, Decimal};
use tracing::instrument;

use crate::{
	domain::{
		Budget, EventListener, GithubRepoIndexRepository, GithubUserIndexRepository, Payment,
		PaymentRequest, WorkItem,
	},
	infrastructure::database::WorkItemRepository,
};

#[derive(Constructor)]
pub struct Projector {
	payment_request_repository: Arc<dyn Repository<PaymentRequest>>,
	payment_repository: Arc<dyn Repository<Payment>>,
	budget_repository: Arc<dyn Repository<Budget>>,
	work_item_repository: WorkItemRepository,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
}

#[async_trait]
impl<'a> EventListener<Event> for Projector {
	#[instrument(name = "budget_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Project(ProjectEvent::Budget {
			id: project_id,
			event,
		}) = event
		{
			match event {
				BudgetEvent::Created { id: budget_id, .. } => {
					self.budget_repository.upsert(Budget {
						id: budget_id,
						project_id: Some(project_id),
						initial_amount: Decimal::ZERO,
						remaining_amount: Decimal::ZERO,
					})?;
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount,
				} => {
					let mut budget = self.budget_repository.find_by_id(budget_id)?;
					budget.remaining_amount += amount;
					budget.initial_amount += amount;
					self.budget_repository.update(budget)?;
				},
				BudgetEvent::Payment {
					id: budget_id,
					event,
				} => match event {
					PaymentEvent::Requested {
						id: payment_id,
						requestor_id,
						recipient_id,
						amount,
						reason,
						duration_worked,
						requested_at,
					} => {
						let mut budget = self.budget_repository.find_by_id(budget_id)?;
						budget.remaining_amount -= amount.amount();
						self.budget_repository.update(budget)?;

						self.payment_request_repository.upsert(PaymentRequest {
							id: payment_id,
							budget_id,
							requestor_id,
							recipient_id,
							amount_in_usd: amount.amount().to_i64().ok_or_else(|| {
								SubscriberCallbackError::Discard(anyhow!(
									"Failed to project invalid amount {amount}"
								))
							})?,
							requested_at,
							invoice_received_at: None,
							hours_worked: i32::try_from(duration_worked.num_hours()).unwrap_or(0),
						})?;

						reason.work_items().iter().try_for_each(
							|work_item| -> Result<(), SubscriberCallbackError> {
								self.work_item_repository.upsert(&WorkItem {
									payment_id,
									repo_id: *work_item.repo_id(),
									issue_number: *work_item.issue_number(),
								})?;
								self.github_repo_index_repository
									.try_insert(work_item.repo_id())?;
								Ok(())
							},
						)?;

						self.github_user_index_repository.try_insert(&recipient_id)?;
					},
					PaymentEvent::Cancelled { id: payment_id } => {
						let payment_request =
							self.payment_request_repository.find_by_id(payment_id)?;
						let mut budget = self.budget_repository.find_by_id(budget_id)?;
						budget.remaining_amount += Decimal::from(payment_request.amount_in_usd);
						self.budget_repository.update(budget)?;
						self.payment_request_repository.delete(payment_id)?;
						self.work_item_repository.delete_by_payment_id(&payment_id)?;
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
				},
			}
		}
		Ok(())
	}
}
