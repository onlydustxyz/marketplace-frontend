use std::sync::Arc;

use domain::{AggregateRootRepository, DomainError, Event, Project, ProjectId, Publisher};
use infrastructure::amqp::UniqueMessage;
use rust_decimal::Decimal;
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
	pub async fn update_allocation(
		&self,
		project_id: &ProjectId,
		new_remaining_amount: &Decimal,
	) -> Result<(), DomainError> {
		let project = self.project_repository.find_by_id(project_id)?;
		let diff_amount = project.budget().spent_amount()
			- project.budget().allocated_amount().amount()
			+ new_remaining_amount;

		project
			.allocate_budget(&diff_amount)
			.map_err(|error| DomainError::InvalidInputs(error.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(())
	}
}
