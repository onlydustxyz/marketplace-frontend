use std::sync::Arc;

use anyhow::Result;
use derive_more::Constructor;
use domain::{
	AggregateRootRepository, Budget, CommandId, DomainError, Event, EventSourcable, Payment,
	PaymentId, Project, ProjectId, Publisher,
};
use infrastructure::amqp::CommandMessage;
use tracing::instrument;

use crate::domain::Publishable;

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<CommandMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub async fn cancel(
		&self,
		project_id: &ProjectId,
		payment_id: &PaymentId,
	) -> Result<(Project, Budget, Payment, CommandId), DomainError> {
		let project = self.project_repository.find_by_id(project_id)?;

		let events = project
			.cancel_payment_request(payment_id)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?;

		let project = project.apply_events(&events);
		let budget = project.budget.clone().unwrap();
		let payment = budget.payments.get(payment_id).cloned().unwrap();
		let command_id = CommandId::new();

		events
			.into_iter()
			.map(Event::from)
			.map(|payload| CommandMessage::new(command_id, payload))
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok((project, budget, payment, command_id))
	}
}
