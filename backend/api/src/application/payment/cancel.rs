use std::sync::Arc;

use anyhow::Result;
use derive_more::Constructor;
use domain::{
	Aggregate, AggregateRepository, CommandId, DomainError, Event, Payment, PaymentId, Publisher,
};
use infrastructure::amqp::CommandMessage;
use tracing::instrument;

use crate::domain::Publishable;

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<CommandMessage<Event>>>,
	payment_repository: AggregateRepository<Payment>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub async fn cancel(&self, payment_id: &PaymentId) -> Result<CommandId, DomainError> {
		let payment = self.payment_repository.find_by_id(payment_id)?;

		let command_id = CommandId::new();

		payment
			.cancel()
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.pending_events()
			.clone()
			.into_iter()
			.map(Event::from)
			.map(|payload| CommandMessage::new(command_id, payload))
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(command_id)
	}
}
