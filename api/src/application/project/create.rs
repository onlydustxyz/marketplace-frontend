use crate::{
	domain::{github::GithubRepositoryId, ProjectDetails, Publishable},
	ProjectDetailsRepository,
};
use anyhow::Result;
use domain::{
	Amount, Budget, BudgetId, Event, Project, ProjectId, Publisher, UniqueMessage, UuidGenerator,
};
use std::sync::Arc;

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: Arc<dyn ProjectDetailsRepository>,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_details_repository: Arc<dyn ProjectDetailsRepository>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
			project_details_repository,
		}
	}

	pub async fn create(
		&self,
		name: String,
		initial_budget: Amount,
		github_repo_id: GithubRepositoryId,
		description: Option<String>,
		telegram_link: Option<String>,
	) -> Result<ProjectId> {
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

		self.project_details_repository.upsert(ProjectDetails::new(
			project_id,
			github_repo_id,
			description,
			telegram_link,
		))?;

		Ok(project_id)
	}
}
