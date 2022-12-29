use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRootRepository, Budget, BudgetId, DomainError, Event, GithubUserId, Payment,
	PaymentId, Publisher, UniqueMessage, UserId,
};
use rusty_money::{crypto, Money};
use serde_json::Value;

use crate::domain::Publishable;

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	budget_repository: AggregateRootRepository<Budget>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		budget_repository: AggregateRootRepository<Budget>,
	) -> Self {
		Self {
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
	) -> Result<PaymentId, DomainError> {
		let budget = self.budget_repository.find_by_id(&budget_id)?;
		let mut events = budget
			.spend(&Money::from_major(amount_in_usd as i64, crypto::USDC).into())
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>();

		let new_payment_id = PaymentId::new();
		events.extend(
			Payment::request(
				new_payment_id,
				budget_id,
				requestor_id,
				recipient_id,
				amount_in_usd,
				reason,
			)
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new),
		);

		events.publish(self.event_publisher.clone()).await?;

		Ok(new_payment_id)
	}
}
