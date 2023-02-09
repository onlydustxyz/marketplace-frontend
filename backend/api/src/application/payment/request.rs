use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRootRepository, DomainError, Event, GithubUserId, PaymentId, Project, ProjectEvent,
	ProjectId, Publisher, UserId,
};
use infrastructure::amqp::UniqueMessage;
use rusty_money::{crypto, Money};
use serde_json::Value;
use tracing::instrument;

use crate::domain::Publishable;

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRootRepository<Project>,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
		}
	}

	#[instrument(skip(self))]
	pub async fn request(
		&self,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Result<PaymentId, DomainError> {
		let project = self.project_repository.find_by_id(&project_id)?;
		let budget = project.budget();
		let new_payment_id = PaymentId::new();

		budget
			.request_payment(
				new_payment_id,
				requestor_id,
				recipient_id,
				Money::from_major(amount_in_usd as i64, crypto::USDC).into(),
				reason,
			)
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(|event| {
				Event::Project(ProjectEvent::Budget {
					id: project_id,
					event,
				})
			})
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(new_payment_id)
	}
}
