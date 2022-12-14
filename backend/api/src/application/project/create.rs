use std::sync::Arc;

use anyhow::Result;
use domain::{
	Amount, Budget, BudgetId, Event, EventSourcable, GithubRepositoryId, Project, ProjectId,
	Publisher, UniqueMessage, UserId, UuidGenerator,
};

use crate::{
	domain::{ProjectDetails, Publishable},
	infrastructure::database::ProjectDetailsRepository,
};

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: ProjectDetailsRepository,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_details_repository: ProjectDetailsRepository,
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
		user_id: UserId,
	) -> Result<ProjectId> {
		let project_id: ProjectId = self.uuid_generator.new_uuid().into();

		let mut events = create_leaded_project(project_id, user_id, name, github_repo_id)?;
		events.extend(allocate_owned_budget(
			self.uuid_generator.new_uuid().into(),
			project_id,
			user_id,
			initial_budget,
		)?);

		events
			.into_iter()
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		self.project_details_repository.upsert(&ProjectDetails::new(
			project_id,
			description,
			telegram_link,
		))?;

		Ok(project_id)
	}
}

fn create_leaded_project(
	project_id: ProjectId,
	leader_id: UserId,
	name: String,
	github_repo_id: GithubRepositoryId,
) -> Result<Vec<Event>> {
	let mut events = Project::create(project_id, name, github_repo_id)?;

	let project = <Project as EventSourcable>::from_events(&events);
	events.extend(project.assign_leader(leader_id)?);

	Ok(events.into_iter().map(Event::from).collect())
}

fn allocate_owned_budget(
	budget_id: BudgetId,
	project_id: ProjectId,
	owner_id: UserId,
	initial_budget: Amount,
) -> Result<Vec<Event>> {
	let mut events = Budget::allocate(
		budget_id,
		domain::BudgetTopic::Project(project_id),
		initial_budget,
	);

	let budget = <Budget as EventSourcable>::from_events(&events);
	events.extend(budget.assign_spender(&owner_id));

	Ok(events.into_iter().map(Event::from).collect())
}
