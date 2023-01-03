use std::sync::Arc;

use anyhow::Result;
use domain::{
	Amount, Budget, BudgetId, DomainError, Event, EventSourcable, GithubRepoExists,
	GithubRepositoryId, Project, ProjectEvent, ProjectId, Publisher, UniqueMessage, UserId,
};

use crate::{
	domain::{ProjectDetails, Publishable},
	infrastructure::database::ProjectDetailsRepository,
};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: ProjectDetailsRepository,
	github: Arc<dyn GithubRepoExists>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_details_repository: ProjectDetailsRepository,
		github: Arc<dyn GithubRepoExists>,
	) -> Self {
		Self {
			event_publisher,
			project_details_repository,
			github,
		}
	}

	#[allow(clippy::too_many_arguments)]
	pub async fn create(
		&self,
		name: String,
		initial_budget: Amount,
		github_repo_id: GithubRepositoryId,
		description: Option<String>,
		telegram_link: Option<String>,
		user_id: UserId,
		logo_url: Option<String>,
	) -> Result<ProjectId, DomainError> {
		let project_id = ProjectId::new();

		self.create_leaded_project(project_id, user_id, name, github_repo_id)
			.await
			.map_err(DomainError::InvalidInputs)?
			.into_iter()
			.chain(
				Budget::allocate(BudgetId::new(), initial_budget).into_iter().map(|event| {
					Event::Project(ProjectEvent::Budget {
						id: project_id,
						event,
					})
				}),
			)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		self.project_details_repository.upsert(&ProjectDetails::new(
			project_id,
			description,
			telegram_link,
			logo_url,
		))?;

		Ok(project_id)
	}

	async fn create_leaded_project(
		&self,
		project_id: ProjectId,
		leader_id: UserId,
		name: String,
		github_repo_id: GithubRepositoryId,
	) -> Result<impl Iterator<Item = Event>> {
		let events = Project::create(self.github.clone(), project_id, name, github_repo_id).await?;
		let project = <Project as EventSourcable>::from_events(&events);

		Ok(events.into_iter().chain(project.assign_leader(leader_id)?).map(Event::from))
	}
}
