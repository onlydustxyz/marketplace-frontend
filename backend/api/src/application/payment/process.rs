use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRootRepository, Amount, Destination, DomainError, Event, Payment, PaymentId,
	PaymentReceipt, PaymentReceiptId, Publisher, UniqueMessage, UuidGenerator,
};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	payment_repository: AggregateRootRepository<Payment>,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		payment_repository: AggregateRootRepository<Payment>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
			payment_repository,
		}
	}

	pub async fn add_receipt(
		&self,
		payment_id: PaymentId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<PaymentReceiptId, DomainError> {
		let receipt_id = self.uuid_generator.new_uuid();
		let payment = self.payment_repository.find_by_id(&payment_id)?;
		let events: Vec<_> = payment
			.add_receipt(receipt_id.into(), amount, receipt)
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect();

		self.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(receipt_id.into())
	}
}
