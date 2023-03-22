use anyhow::{anyhow, Result};
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{BudgetEvent, Event, PaymentEvent, ProjectEvent, SubscriberCallbackError};
use rust_decimal::{prelude::ToPrimitive, Decimal};
use serde::Deserialize;
use tracing::instrument;

use crate::{
	domain::{Budget, EventListener, Payment, PaymentRequest, WorkItem},
	infrastructure::database::{
		BudgetRepository, PaymentRepository, PaymentRequestRepository, WorkItemRepository,
	},
};

#[derive(Constructor)]
pub struct Projector {
	payment_request_repository: PaymentRequestRepository,
	payment_repository: PaymentRepository,
	budget_repository: BudgetRepository,
	work_item_repository: WorkItemRepository,
}

#[derive(Deserialize)]
pub struct Reason {
	work_items: Vec<String>,
}

#[async_trait]
impl EventListener for Projector {
	#[instrument(name = "budget_projection", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Project(ProjectEvent::Budget {
			id: project_id,
			event,
		}) = event
		{
			match event {
				BudgetEvent::Created { id: budget_id, .. } => {
					self.budget_repository.upsert(&Budget::new(
						*budget_id,
						Some(*project_id),
						Decimal::ZERO,
						Decimal::ZERO,
					))?;
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount,
				} => {
					let mut budget = self.budget_repository.find_by_id(budget_id)?;
					budget.remaining_amount += amount;
					budget.initial_amount += amount;
					self.budget_repository.update(budget_id, &budget)?;
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
						requested_at,
					} => {
						let mut budget = self.budget_repository.find_by_id(budget_id)?;
						budget.remaining_amount -= amount.amount();
						self.budget_repository.update(budget_id, &budget)?;

						self.payment_request_repository.upsert(&PaymentRequest::new(
							*payment_id,
							*budget_id,
							*requestor_id,
							*recipient_id,
							amount.amount().to_i64().ok_or_else(|| {
								SubscriberCallbackError::Discard(anyhow!(
									"Failed to project invalid amount {amount}"
								))
							})?,
							*requested_at,
							None,
						))?;

						serde_json::from_value::<Reason>(reason.clone())
							.map_err(|e| SubscriberCallbackError::Discard(anyhow!(e)))?
							.work_items
							.iter()
							.try_for_each(|url| {
								let url = url.parse().map_err(|e: url::ParseError| {
									SubscriberCallbackError::Discard(anyhow!(e))
								})?;

								let work_item = WorkItem::from_url(*payment_id, url)
									.map_err(|e| SubscriberCallbackError::Discard(anyhow!(e)))?;

								self.work_item_repository.upsert(&work_item)?;

								Result::<_, SubscriberCallbackError>::Ok(())
							})?;
					},
					PaymentEvent::Cancelled { id: payment_id } => {
						let payment_request =
							self.payment_request_repository.find_by_id(payment_id)?;
						let mut budget = self.budget_repository.find_by_id(budget_id)?;
						budget.remaining_amount += Decimal::from(*payment_request.amount_in_usd());
						self.budget_repository.update(budget_id, &budget)?;
						self.payment_request_repository.delete(payment_id)?;
						self.work_item_repository.delete_by_payment_id(payment_id)?;
					},
					PaymentEvent::Processed {
						id: payment_id,
						receipt_id,
						amount,
						receipt,
					} => self.payment_repository.upsert(&Payment::new(
						*receipt_id,
						*amount.amount(),
						amount.currency().to_string(),
						serde_json::to_value(receipt)
							.map_err(|e| SubscriberCallbackError::Discard(e.into()))?,
						(*payment_id).into(),
					))?,
					PaymentEvent::InvoiceReceived {
						id: payment_id,
						received_at,
					} => {
						let mut payment_request =
							self.payment_request_repository.find_by_id(payment_id)?;
						payment_request.invoice_received_at = Some(*received_at);
						self.payment_request_repository.update(payment_id, payment_request)?;
					},
					PaymentEvent::InvoiceRejected { id: payment_id } => {
						let mut payment_request =
							self.payment_request_repository.find_by_id(payment_id)?;
						payment_request.invoice_received_at = None;
						self.payment_request_repository.update(payment_id, payment_request)?;
					},
				},
			}
		}
		Ok(())
	}
}
