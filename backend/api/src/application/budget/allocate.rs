use std::sync::Arc;

use anyhow::anyhow;
use domain::{
	AggregateRootRepository, Amount, BudgetId, DomainError, Event, EventSourcable, Project,
	ProjectId, Publisher,
};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::domain::Publishable;

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRootRepository<Project>,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
		}
	}

	#[instrument(skip(self))]
	pub async fn allocate(
		&self,
		project_id: ProjectId,
		amount: Amount,
	) -> Result<BudgetId, DomainError> {
		let project = self.project_repository.find_by_id(&project_id)?;

		let events = project
			.allocate_budget(amount)
			.map_err(|error| DomainError::InvalidInputs(error.into()))?;

		let project = project.apply_events(&events);

		let budget = project.budget.as_ref().ok_or(DomainError::InternalError(anyhow!(
			"Failed while allocating budget"
		)))?;

		events
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(budget.id)
	}
}
