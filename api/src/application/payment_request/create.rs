use crate::domain::Publishable;
use anyhow::Result;
use domain::{
	Event, PaymentId, PaymentRequest, ProjectId, Publisher, UniqueMessage, UserId, UuidGenerator,
};
use serde_json::Value;
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
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Result<PaymentId> {
		let payment_request_id = self.uuid_generator.new_uuid();

		PaymentRequest::create(
			payment_request_id.into(),
			project_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		)
		.into_iter()
		.map(Event::from)
		.map(UniqueMessage::new)
		.collect::<Vec<_>>()
		.publish(self.event_publisher.clone())
		.await?;

		Ok(payment_request_id.into())
	}
}
