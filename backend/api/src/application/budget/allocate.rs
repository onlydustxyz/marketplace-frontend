use std::sync::Arc;

use derive_more::Constructor;
use domain::{
	sponsor, AggregateRepository, Amount, Budget, BudgetId, DomainError, Event, EventSourcable,
	Project, ProjectId, Publisher,
};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::domain::Publishable;

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRepository<Project>,
	budget_repository: AggregateRepository<Budget>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub async fn allocate(
		&self,
		project_id: ProjectId,
		amount: Amount,
		sponsor_id: Option<sponsor::Id>,
	) -> Result<BudgetId, DomainError> {
		let project = self.project_repository.find_by_id(&project_id)?;

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

		events
			.into_iter()
			.chain(budget.allocate(*amount.amount(), sponsor_id)?.into_iter().map(Event::from))
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(budget.id)
	}
}
