use crate::domain::Publishable;
use anyhow::Result;
use domain::{
	specifications::UserExists as UserExistsSpecification, BudgetId, Event, Payment, PaymentId,
	Publisher, UniqueMessage, UserId, UserRepository, UuidGenerator,
};
use serde_json::Value;
use std::sync::Arc;

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	user_exists_specification: UserExistsSpecification,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		user_repository: Arc<dyn UserRepository>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
			user_exists_specification: UserExistsSpecification::new(user_repository),
		}
	}

	pub async fn request(
		&self,
		budget_id: BudgetId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Result<PaymentId> {
		let payment_id = self.uuid_generator.new_uuid();

		Payment::request(
			&self.user_exists_specification,
			payment_id.into(),
			budget_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		)
		.await?
		.into_iter()
		.map(Event::from)
		.map(UniqueMessage::new)
		.collect::<Vec<_>>()
		.publish(self.event_publisher.clone())
		.await?;

		Ok(payment_id.into())
	}
}
