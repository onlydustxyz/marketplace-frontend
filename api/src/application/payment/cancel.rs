use std::sync::Arc;

use anyhow::{anyhow, Result};
use derive_more::Constructor;
use domain::{
	AggregateRepository, Budget, CommandId, DomainError, Event, Payment, PaymentId, Project,
	Publisher,
};
use tracing::instrument;

use crate::domain::Publishable;

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<Event>>,
	payment_repository: AggregateRepository<Payment>,
	project_repository: AggregateRepository<Project>,
	budget_repository: AggregateRepository<Budget>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub async fn cancel(&self, payment_id: &PaymentId) -> Result<CommandId, DomainError> {
		let payment = self.payment_repository.find_by_id(payment_id)?;
		let project = self.project_repository.find_by_id(&payment.project_id)?;
		let budget = self.budget_repository.find_by_id(
			project
				.budgets_by_currency
				.get(payment.currency.code)
				.ok_or_else(|| DomainError::InternalError(anyhow!("Budget not found")))?,
		)?;

		let command_id = CommandId::new();

		let amount = payment.requested_amount;

		payment
			.cancel()
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.map(Event::from)
			.chain(
				budget
					.spend(-amount)
					.map_err(|e| DomainError::InvalidInputs(e.into()))?
					.map(Event::from),
			)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(command_id)
	}
}
