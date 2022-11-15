use anyhow::Result;
use chrono::Utc;
use event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event, EventOrigin};
use marketplace_domain::{
	Destination, Payment, PaymentId, PaymentReceipt, Publisher, UuidGenerator,
};
use std::sync::Arc;

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<Event>>,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<Event>>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
		}
	}

	pub async fn mark_payment_as_processed(
		&self,
		id: PaymentId,
		receipt: PaymentReceipt,
	) -> Result<()> {
		let events: Vec<Event> = Payment::mark_as_processed(id, receipt)
			.into_iter()
			.map(|event| Event {
				deduplication_id: self.uuid_generator.new_uuid().to_string(),
				event: event.into(),
				timestamp: Utc::now().naive_utc(),
				origin: EventOrigin::BACKEND,
				metadata: Default::default(),
			})
			.collect();

		self.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(())
	}
}
