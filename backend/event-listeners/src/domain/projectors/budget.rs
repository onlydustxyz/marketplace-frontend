use anyhow::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{BudgetEvent, BudgetTopic, Event, SubscriberCallbackError};

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
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Budget(event) = event {
			match event {
				BudgetEvent::Allocated { id, amount, topic } => {
					let BudgetTopic::Project(project_id) = topic;
					self.budget_repository.insert(&Budget::new(
						*id,
						Some((*project_id).into()),
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
