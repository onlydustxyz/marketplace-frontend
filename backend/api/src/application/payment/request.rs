use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRootRepository, Budget, BudgetId, Event, GithubUserId, Payment, PaymentId, Publisher,
	UniqueMessage, UserId, UuidGenerator,
};
use rusty_money::{crypto, Money};
use serde_json::Value;

use crate::domain::Publishable;

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	budget_repository: AggregateRootRepository<Budget>,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		budget_repository: AggregateRootRepository<Budget>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
			budget_repository,
		}
	}

	pub async fn request(
		&self,
		budget_id: BudgetId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Result<PaymentId> {
		let budget = self.budget_repository.find_by_id(&budget_id)?;
		let mut events = budget
			.spend(&Money::from_major(amount_in_usd as i64, crypto::USDC).into())?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>();

		let payment_id = self.uuid_generator.new_uuid();
		events.extend(
			Payment::request(
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
			.map(UniqueMessage::new),
		);

		events.publish(self.event_publisher.clone()).await?;

		Ok(payment_id.into())
	}
}
