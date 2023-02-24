use std::sync::Arc;

use domain::{AggregateRootRepository, Amount, DomainError, Event, Project, ProjectId, Publisher};
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
		new_remaining_amount: &Amount,
	) -> Result<(), DomainError> {
		let project = self.project_repository.find_by_id(project_id)?;

		let current_remaining_amount = project.budget().as_ref().map_or(Decimal::ZERO, |b| {
			b.allocated_amount().amount() - b.spent_amount()
		});

		let diff_amount = new_remaining_amount - current_remaining_amount;

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
