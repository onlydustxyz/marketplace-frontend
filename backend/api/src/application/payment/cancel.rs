use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRootRepository, Destination, DomainError, Event, Payment, PaymentId, Publisher,
};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	payment_repository: AggregateRootRepository<Payment>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		payment_repository: AggregateRootRepository<Payment>,
	) -> Self {
		Self {
			event_publisher,
			payment_repository,
		}
	}

	#[instrument(skip(self))]
	pub async fn cancel(&self, payment_id: PaymentId) -> Result<(), DomainError> {
		let payment = self.payment_repository.find_by_id(&payment_id)?;
		let events: Vec<_> = payment
			.cancel()
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect();

		self.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(())
	}
}
