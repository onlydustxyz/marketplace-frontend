use std::sync::Arc;

use anyhow::Result;
use domain::{AggregateRootRepository, DomainError, Event, Payment, PaymentId, Publisher};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::domain::Publishable;

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
		payment
			.cancel()
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;
		Ok(())
	}
}
