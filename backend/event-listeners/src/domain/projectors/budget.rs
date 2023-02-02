use anyhow::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{BudgetEvent, Event, ProjectEvent, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{Budget, EventListener},
	infrastructure::database::BudgetRepository,
};

#[derive(Constructor)]
pub struct Projector {
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
				BudgetEvent::Spent { id, amount } => {
					let id = *id;
					let mut budget = self.budget_repository.find_by_id(&id)?;
					budget.remaining_amount -= amount.amount();
					self.budget_repository.update(&id, &budget)?;
				},
			}
		}
		Ok(())
	}
}
