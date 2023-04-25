use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRootRepository, Budget, DomainError, Event, EventSourcable, Payment, PaymentId,
	Project, ProjectId, Publisher,
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
	pub async fn cancel(
		&self,
		project_id: &ProjectId,
		payment_id: &PaymentId,
	) -> Result<(Project, Budget, Payment), DomainError> {
		let project = self.project_repository.find_by_id(project_id)?;

		let events = project
			.cancel_payment_request(payment_id)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?;

		let project = project.apply_events(&events);
		let budget = project.budget().clone().unwrap();
		let payment = budget.payments().get(payment_id).cloned().unwrap();

		events
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok((project, budget, payment))
	}
}
