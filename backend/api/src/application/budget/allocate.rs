use std::sync::Arc;

use anyhow::anyhow;
use derive_more::Constructor;
use domain::{
	sponsor, AggregateRepository, Amount, Budget, BudgetId, DomainError, Event, Project, ProjectId,
	Publisher,
};
use infrastructure::{amqp::UniqueMessage, database::Repository};
use tracing::instrument;

use crate::{domain::Publishable, models::Sponsor};

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRepository<Project>,
	budget_repository: AggregateRepository<Budget>,
	sponsor_repository: Arc<dyn Repository<Sponsor>>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub fn build_allocation(
		&self,
		mut project: Project,
		amount: Amount,
		sponsor_id: Option<sponsor::Id>,
	) -> Result<(Project, Budget), DomainError> {
		if let Some(sponsor_id) = sponsor_id {
			if !self.sponsor_repository.exists(sponsor_id)? {
				return Err(DomainError::InvalidInputs(anyhow!(
					"Sponsor does not exist"
				)));
			}
		}

		let mut budget = match project.budgets_by_currency.get(amount.currency().code) {
			Some(budget_id) => self.budget_repository.find_by_id(budget_id)?,
			None => {
				let budget = Budget::create(BudgetId::new(), amount.currency());
				project = project.link_budget(budget.id, amount.currency())?;
				budget
			},
		};

		budget = budget.allocate(*amount.amount(), sponsor_id)?;

		Ok((project, budget))
	}

	#[instrument(skip(self))]
	pub async fn allocate(
		&self,
		project_id: ProjectId,
		amount: Amount,
		sponsor_id: Option<sponsor::Id>,
	) -> Result<BudgetId, DomainError> {
		let project = self.project_repository.find_by_id(&project_id)?;

		let (project, budget) = self.build_allocation(project, amount, sponsor_id)?;

		let budget_id = budget.id;

		project
			.map(Event::from)
			.chain(budget.map(Event::from))
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(budget_id)
	}
}
