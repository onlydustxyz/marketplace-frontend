use std::sync::Arc;

use anyhow::{anyhow, Result};
use chrono::Duration;
use derive_more::Constructor;
use domain::{
	AggregateRepository, Amount, Budget, CommandId, Currency, DomainError, Event, GithubUserId,
	Payment, PaymentId, PaymentReason, Project, ProjectId, Publisher, UserId,
};
use rust_decimal::Decimal;
use tracing::instrument;

use crate::domain::Publishable;

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<Event>>,
	project_repository: AggregateRepository<Project>,
	budget_repository: AggregateRepository<Budget>,
}

impl Usecase {
	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn request(
		&self,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount: Decimal,
		currency: &'static Currency,
		hours_worked: Option<u32>,
		reason: PaymentReason,
	) -> Result<(PaymentId, CommandId), DomainError> {
		let payment_id = PaymentId::new();

		let project = self.project_repository.find_by_id(&project_id)?;
		let budget_id = project.budgets_by_currency.get(currency.code).ok_or_else(|| {
			DomainError::InvalidInputs(anyhow!("Project has no budget to spend from"))
		})?;

		let budget = self
			.budget_repository
			.find_by_id(budget_id)?
			.spend(amount)
			.map_err(|e| DomainError::InvalidInputs(e.into()))?;

		let payment = Payment::request(
			payment_id,
			project_id,
			requestor_id,
			recipient_id,
			Amount::from_decimal(amount, currency),
			hours_worked.map(|hours_worked| Duration::hours(hours_worked as i64)),
			reason.clone(),
		);

		let command_id = CommandId::new();

		budget
			.map(Event::from)
			.chain(payment.map(Event::from))
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok((payment_id, command_id))
	}
}
