use std::sync::Arc;

use anyhow::{anyhow, Result};
use chrono::Duration;
use derive_more::Constructor;
use domain::{
	currencies, AggregateRepository, Amount, Budget, CommandId, DomainError, Event, GithubUserId,
	Payment, PaymentId, PaymentReason, PaymentWorkItem, Project, ProjectId, Publisher, UserId,
};
use infrastructure::amqp::CommandMessage;
use rust_decimal::Decimal;
use tracing::instrument;

use crate::domain::{services::indexer, Publishable};

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<CommandMessage<Event>>>,
	project_repository: AggregateRepository<Project>,
	budget_repository: AggregateRepository<Budget>,
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
	) -> Result<(PaymentId, CommandId), DomainError> {
		let payment_id = PaymentId::new();

		let project = self.project_repository.find_by_id(&project_id)?;
		let budget_id = project.budgets_by_currency.get(currencies::USD.code).ok_or_else(|| {
			DomainError::InvalidInputs(anyhow!("Project has no budget to spend from"))
		})?;
		let budget = self.budget_repository.find_by_id(&budget_id)?;

		let budget_events = budget
			.spend(Decimal::from(amount_in_usd))
			.map_err(|e| DomainError::InvalidInputs(e.into()))?;

		let payment_events = Payment::request(
			payment_id,
			project_id,
			requestor_id,
			recipient_id,
			Amount::from_major(amount_in_usd as i64, currencies::USD),
			Duration::hours(hours_worked as i64),
			reason.clone(),
		);

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

		let command_id = CommandId::new();

		budget_events
			.into_iter()
			.map(Event::from)
			.chain(payment_events.into_iter().map(Event::from))
			.map(|payload| CommandMessage::new(command_id, payload))
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok((payment_id, command_id))
	}
}
