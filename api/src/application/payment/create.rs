use anyhow::Result;
use chrono::Utc;
use domain::{Destination, Payment, PaymentId, PaymentReceipt, Publisher, UuidGenerator};
use event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event, EventOrigin};
<<<<<<<< HEAD:api/src/application/payment/mark_as_processed.rs
========
use marketplace_domain::{
	Destination, Payment, PaymentId, PaymentReceipt, PaymentRequestId, Publisher, UuidGenerator,
};
>>>>>>>> 26a89161 (♻️ link payment aggregate to payment_request):api/src/application/payment/create.rs
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

	pub async fn create(
		&self,
		request_id: PaymentRequestId,
		receipt: PaymentReceipt,
	) -> Result<PaymentId> {
		let payment_id = self.uuid_generator.new_uuid();
		let events: Vec<Event> = Payment::create(payment_id.into(), request_id, receipt)
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

		Ok(payment_id.into())
	}
}
