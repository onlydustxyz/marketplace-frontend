use crate::domain::Publishable;
use anyhow::Result;
use domain::{
	Amount, Budget, BudgetId, Event, Project, ProjectId, Publisher, UniqueMessage, UuidGenerator,
};
use std::sync::Arc;

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
		}
	}

	pub async fn create(&self, name: String, initial_budget: Amount) -> Result<ProjectId> {
		let project_id: ProjectId = self.uuid_generator.new_uuid().into();

		let mut events: Vec<_> = Project::create(project_id, name)?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect();

		let budget_id: BudgetId = self.uuid_generator.new_uuid().into();
		events.extend(
			Budget::allocate(
				budget_id,
				domain::BudgetTopic::Project(project_id),
				initial_budget,
			)
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new),
		);

		events.publish(self.event_publisher.clone()).await?;

		Ok(project_id)
	}
}
