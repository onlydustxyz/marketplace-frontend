use crate::domain::{Budget, EventListener, ProjectionRepository};
use anyhow::Result;
use async_trait::async_trait;
use domain::{BudgetEvent, BudgetTopic, Event};
use std::sync::Arc;

#[derive(new)]
pub struct Projector {
	budget_repository: Arc<dyn ProjectionRepository<Budget>>,
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
						(*project_id).into(),
						*amount.amount(),
						*amount.amount(),
					))?;
				},
			}
		}
		Ok(())
	}
}
