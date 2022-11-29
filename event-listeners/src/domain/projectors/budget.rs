use crate::domain::{Budget, EventListener};
use anyhow::Result;
use async_trait::async_trait;
use domain::{BudgetEvent, BudgetTopic, EntityRepository, Event};
use std::sync::Arc;

#[derive(new)]
pub struct Projector {
	budget_repository: Arc<dyn EntityRepository<Budget>>,
}

#[async_trait]
impl EventListener for Projector {
	async fn on_event(&self, event: &Event) -> Result<()> {
		if let Event::Budget(event) = event {
			match event {
				BudgetEvent::Allocated { id, amount, topic } => {
					let BudgetTopic::Project(project_id) = topic;
					self.budget_repository.insert(&Budget::new(
						(*id).into(),
						Some((*project_id).into()),
						*amount.amount(),
						*amount.amount(),
					))?;
				},
				BudgetEvent::Spent { id, amount } => {
					let id = (*id).into();
					let mut budget = self.budget_repository.find_by_id(&id)?;
					budget.remaining_amount -= amount.amount();
					self.budget_repository.update(&id, &budget)?;
				},
			}
		}
		Ok(())
	}
}
