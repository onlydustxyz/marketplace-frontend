use std::sync::Arc;

use anyhow::anyhow;
use derive_more::Constructor;
use domain::{
	sponsor, AggregateRepository, Amount, Budget, BudgetId, DomainError, Event, EventSourcable,
	Project, ProjectId, Publisher,
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
		project: Project,
		amount: Amount,
		sponsor_id: Option<sponsor::Id>,
	) -> Result<(Budget, impl Iterator<Item = Event>), DomainError> {
		if let Some(sponsor_id) = sponsor_id {
			if !self.sponsor_repository.exists(sponsor_id)? {
				return Err(DomainError::InvalidInputs(anyhow!(
					"Sponsor does not exist"
				)));
			}
		}

		let mut events = Vec::new();

		let budget = match project.budgets_by_currency.get(amount.currency().code) {
			Some(budget_id) => self.budget_repository.find_by_id(budget_id)?,
			None => {
				let budget_id = BudgetId::new();
				let budget_events = Budget::create(budget_id, amount.currency());
				let budget = Budget::from_events(&budget_events);
				events.append(&mut budget_events.into_iter().map(Event::from).collect());
				events.append(
					&mut project
						.link_budget(budget_id, amount.currency())?
						.into_iter()
						.map(Event::from)
						.collect(),
				);

				budget
			},
		};

		let events = events
			.into_iter()
			.chain(budget.allocate(*amount.amount(), sponsor_id)?.into_iter().map(Event::from));

		Ok((budget, events))
	}

	#[instrument(skip(self))]
	pub async fn allocate(
		&self,
		project_id: ProjectId,
		amount: Amount,
		sponsor_id: Option<sponsor::Id>,
	) -> Result<BudgetId, DomainError> {
		let project = self.project_repository.find_by_id(&project_id)?;

		let (budget, events) = self.build_allocation(project, amount, sponsor_id)?;

		events
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(budget.id)
	}
}
