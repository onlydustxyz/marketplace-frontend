use std::sync::Arc;

use anyhow::Result;
use chrono::Duration;
use derive_more::Constructor;
use domain::{
	AggregateRootRepository, Budget, CommandId, DomainError, Event, EventSourcable, GithubUserId,
	Payment, PaymentId, PaymentReason, PaymentWorkItem, Project, ProjectId, Publisher, UserId,
};
use infrastructure::amqp::CommandMessage;
use rusty_money::{crypto, Money};
use tracing::instrument;

use crate::domain::{services::indexer, Publishable};

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<CommandMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
	github_indexer_service: Arc<dyn indexer::Service>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub async fn request(
		&self,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount_in_usd: u32,
		hours_worked: u32,
		reason: PaymentReason,
	) -> Result<(Project, Budget, Payment, CommandId), DomainError> {
		let project = self.project_repository.find_by_id(&project_id)?;
		let new_payment_id = PaymentId::new();

		let events = project
			.request_payment(
				new_payment_id,
				requestor_id,
				recipient_id,
				Money::from_major(amount_in_usd as i64, crypto::USDC).into(),
				Duration::hours(hours_worked as i64),
				reason.clone(),
			)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?;

		self.github_indexer_service
			.index_user(recipient_id)
			.await
			.map_err(DomainError::InternalError)?;

		for work_item in reason.work_items {
			match work_item {
				PaymentWorkItem::Issue {
					repo_id, number, ..
				} => {
					self.github_indexer_service
						.index_repo(repo_id)
						.await
						.map_err(DomainError::InternalError)?;

					self.github_indexer_service
						.index_issue(repo_id, number)
						.await
						.map_err(DomainError::InternalError)?;
				},
				PaymentWorkItem::PullRequest {
					repo_id, number, ..
				}
				| PaymentWorkItem::CodeReview {
					repo_id, number, ..
				} => {
					self.github_indexer_service
						.index_repo(repo_id)
						.await
						.map_err(DomainError::InternalError)?;

					self.github_indexer_service
						.index_pull_request(repo_id, number)
						.await
						.map_err(DomainError::InternalError)?;
				},
			}
		}

		let project = project.apply_events(&events);
		let budget = project.budget().clone().unwrap();
		let payment = budget.payments().get(&new_payment_id).cloned().unwrap();
		let command_id = CommandId::new();

		events
			.into_iter()
			.map(Event::from)
			.map(|payload| CommandMessage::new(command_id, payload))
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok((project, budget, payment, command_id))
	}
}
