use anyhow::Result;
use domain::{
	Amount, Destination, Event, Payment, PaymentId, PaymentReceipt, PaymentRequestId, Publisher,
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

	pub async fn create(
		&self,
		request_id: PaymentRequestId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<PaymentId> {
		let payment_id = self.uuid_generator.new_uuid();
		let events: Vec<_> = Payment::create(payment_id.into(), request_id, amount, receipt)
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect();

		self.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(payment_id.into())
	}
}
