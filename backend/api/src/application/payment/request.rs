use std::sync::Arc;

use anyhow::{anyhow, Result};
use chrono::Duration;
use domain::{
	AggregateRootRepository, DomainError, Event, GithubUserId, PaymentId, PaymentReason, Project,
	ProjectId, Publisher, UserId,
};
use infrastructure::amqp::UniqueMessage;
use rusty_money::{crypto, Money};
use tracing::instrument;

use crate::{application::dusty_bot, domain::Publishable};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
	comment_issue_for_payment_requested_usecase:
		dusty_bot::comment_issue_for_payment_requested::Usecase,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRootRepository<Project>,
		comment_issue_for_payment_requested_usecase: dusty_bot::comment_issue_for_payment_requested::Usecase,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
			comment_issue_for_payment_requested_usecase,
		}
	}

	#[instrument(skip(self))]
	pub async fn request(
		&self,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount_in_usd: u32,
		hours_worked: u32,
		reason: PaymentReason,
	) -> Result<PaymentId, DomainError> {
		let project = self.project_repository.find_by_id(&project_id)?;
		let new_payment_id = PaymentId::new();

		project
			.request_payment(
				new_payment_id,
				requestor_id,
				recipient_id,
				Money::from_major(amount_in_usd as i64, crypto::USDC).into(),
				Duration::hours(hours_worked as i64),
				reason.clone(),
			)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		self.comment_issue_for_payment_requested_usecase
			.comment_issue_for_payment_requested(
				new_payment_id,
				requestor_id,
				recipient_id,
				amount_in_usd,
				hours_worked,
				reason,
			)
			.await
			.map_err(|e| DomainError::InternalError(anyhow!(e)))?;

		Ok(new_payment_id)
	}
}
