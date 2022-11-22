use anyhow::Result;
use chrono::Utc;
use domain::{Destination, PaymentId, PaymentRequest, ProjectId, Publisher, UserId, UuidGenerator};
use event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event, EventOrigin};
use serde_json::Value;
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
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Result<PaymentId> {
		let payment_request_id = self.uuid_generator.new_uuid();
		let events: Vec<Event> = PaymentRequest::create(
			payment_request_id.into(),
			project_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		)
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

		Ok(payment_request_id.into())
	}
}
