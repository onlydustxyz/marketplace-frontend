use anyhow::Result;
use domain::{
	Amount, Destination, Event, Payment, PaymentId, PaymentReceipt, PaymentReceiptId, Publisher,
	UniqueMessage, UuidGenerator,
};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;
use std::sync::Arc;

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
		}
	}

	pub async fn add_receipt(
		&self,
		payment_id: PaymentId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<PaymentReceiptId> {
		let receipt_id = self.uuid_generator.new_uuid();
		let events: Vec<_> = Payment::add_receipt(payment_id, receipt_id.into(), amount, receipt)?
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
