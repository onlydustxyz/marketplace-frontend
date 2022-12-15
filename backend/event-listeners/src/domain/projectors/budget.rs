use anyhow::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{BudgetEvent, BudgetTopic, Event, MappingRepository};

use crate::{
	domain::{Budget, EventListener},
	infrastructure::database::{BudgetRepository, BudgetSpenderRepository},
};

#[derive(Constructor)]
pub struct Projector {
	budget_repository: BudgetRepository,
	budget_spender_repository: BudgetSpenderRepository,
}

#[async_trait]
impl EventListener for Projector {
	async fn on_event(&self, event: &Event) -> Result<()> {
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
				BudgetEvent::SpenderAssigned { id, spender_id } => {
					self.budget_spender_repository.insert(id, spender_id)?;
				},
			}
		}
		Ok(())
	}
}
