use std::sync::Arc;

use anyhow::Result;
use derive_more::Constructor;
use domain::{AggregateRepository, DomainError, Event, Payment, PaymentId, Publisher};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::domain::Publishable;

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	payment_repository: AggregateRepository<Payment>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub async fn mark_invoice_as_received(
		&self,
		payments: Vec<PaymentId>,
	) -> Result<(), DomainError> {
		let mut events = Vec::new();

		for payment_id in payments {
			events.extend(
				self.payment_repository
					.find_by_id(&payment_id)?
					.mark_invoice_as_received()
					.map_err(|e| DomainError::InvalidInputs(e.into()))?,
			);
		}

		events
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(())
	}

	#[instrument(skip(self))]
	pub async fn reject_invoice(&self, payments: Vec<PaymentId>) -> Result<(), DomainError> {
		let mut events = Vec::new();

		for payment_id in payments {
			events.extend(
				self.payment_repository
					.find_by_id(&payment_id)?
					.reject_invoice()
					.map_err(|e| DomainError::InvalidInputs(e.into()))?,
			);
		}

		events
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(())
	}
}
