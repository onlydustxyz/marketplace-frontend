use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRootRepository, Amount, Destination, DomainError, Event, Payment, PaymentId,
	PaymentReceipt, PaymentReceiptId, Publisher, UniqueMessage,
};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;

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

	pub async fn add_receipt(
		&self,
		payment_id: PaymentId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<PaymentReceiptId, DomainError> {
		let new_receipt_id = PaymentReceiptId::new();
		let payment = self.payment_repository.find_by_id(&payment_id)?;
		let events: Vec<_> = payment
			.add_receipt(new_receipt_id, amount, receipt)
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect();

		self.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(new_receipt_id)
	}
}
