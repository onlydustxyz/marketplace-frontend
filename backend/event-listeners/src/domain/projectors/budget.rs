use anyhow::{anyhow, Result};
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{BudgetEvent, Event, PaymentEvent, ProjectEvent, SubscriberCallbackError};
use rust_decimal::{prelude::ToPrimitive, Decimal};
use tracing::instrument;

use crate::{
	domain::{Budget, EventListener, Payment, PaymentRequest},
	infrastructure::database::{BudgetRepository, PaymentRepository, PaymentRequestRepository},
};

#[derive(Constructor)]
pub struct Projector {
	payment_request_repository: PaymentRequestRepository,
	payment_repository: PaymentRepository,
	budget_repository: BudgetRepository,
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
				BudgetEvent::Allocated { id, amount } => {
					self.budget_repository.upsert(&Budget::new(
						*id,
						Some(*project_id),
						*amount.amount(),
						*amount.amount(),
					))?;
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
								SubscriberCallbackError::Fatal(anyhow!(
									"Failed to project invalid amount {amount}"
								))
							})?,
							reason.clone(),
							*requested_at,
						))?;
					},
					PaymentEvent::Cancelled { id: payment_id } => {
						let payment_request =
							self.payment_request_repository.find_by_id(payment_id)?;
						let mut budget = self.budget_repository.find_by_id(budget_id)?;
						budget.remaining_amount += Decimal::from(*payment_request.amount_in_usd());
						self.budget_repository.update(budget_id, &budget)?;
						self.payment_request_repository.delete(payment_id)?;
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
				},
			}
		}
		Ok(())
	}
}
