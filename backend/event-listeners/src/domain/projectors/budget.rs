use anyhow::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{BudgetEvent, Event, PaymentEvent, ProjectEvent, SubscriberCallbackError};
use rust_decimal::Decimal;
use tracing::instrument;

use crate::{
	domain::{Budget, EventListener},
	infrastructure::database::{BudgetRepository, PaymentRequestRepository},
};

#[derive(Constructor)]
pub struct Projector {
	payment_request_repository: PaymentRequestRepository,
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
				BudgetEvent::Spent { .. } => {},
				BudgetEvent::Payment {
					id: budget_id,
					event,
				} => match event {
					PaymentEvent::Requested { amount, .. } => {
						let mut budget = self.budget_repository.find_by_id(&budget_id)?;
						budget.remaining_amount -= amount.amount();
						self.budget_repository.update(budget_id, &budget)?;
					},
					PaymentEvent::Cancelled { id: payment_id } => {
						let payment_request =
							self.payment_request_repository.find_by_id(payment_id)?;
						let mut budget = self.budget_repository.find_by_id(&budget_id)?;
						budget.remaining_amount -= Decimal::from(*payment_request.amount_in_usd());
						self.budget_repository.update(budget_id, &budget)?;
					},
					PaymentEvent::Processed { .. } => (),
				},
			}
		}
		Ok(())
	}
}
