use std::sync::Arc;

use anyhow::{anyhow, Result};
use domain::{Amount, DomainError, Event, GithubRepositoryId, Project, ProjectId, Publisher};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::{
	domain::{GithubRepoExists, GithubService, ProjectDetails, Publishable},
	infrastructure::database::{
		GithubRepoRepository, ProjectDetailsRepository, ProjectGithubRepoRepository,
	},
	presentation::http::dto::NonEmptyTrimmedString,
};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: ProjectDetailsRepository,
	github_repo_repository: GithubRepoRepository,
	project_github_repo_repository: ProjectGithubRepoRepository,
	github_repo_exists: Arc<dyn GithubRepoExists>,
	github_service: Arc<dyn GithubService>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_details_repository: ProjectDetailsRepository,
		github_repo_repository: GithubRepoRepository,
		project_github_repo_repository: ProjectGithubRepoRepository,
		github_repo_exists: Arc<dyn GithubRepoExists>,
		github_service: Arc<dyn GithubService>,
	) -> Self {
		Self {
			event_publisher,
			project_details_repository,
			github_repo_repository,
			project_github_repo_repository,
			github_repo_exists,
			github_service,
		}
	}

	async fn update_github_repo_details(&self, github_repo_id: &GithubRepositoryId) -> Result<()> {
		let repo = self.github_service.fetch_repository_details(github_repo_id).await?;
		self.github_repo_repository.upsert(&repo)?;
		Ok(())
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn create(
		&self,
		name: NonEmptyTrimmedString,
		initial_budget: Amount,
		github_repo_id: GithubRepositoryId,
		description: Option<String>,
		telegram_link: Option<String>,
		logo_url: Option<String>,
	) -> Result<ProjectId, DomainError> {
		let project_id = ProjectId::new();

		if !self
			.github_repo_exists
			.is_statified_by(&github_repo_id)
			.await
			.map_err(DomainError::InternalError)?
		{
			return Err(DomainError::InvalidInputs(anyhow!(
				"Github repository {github_repo_id} does not exist"
			)));
		}

		Project::create(project_id, initial_budget)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		self.project_details_repository.upsert(&ProjectDetails::new(
			project_id,
			name.into_inner(),
			description,
			telegram_link,
			logo_url,
		))?;

		self.update_github_repo_details(&github_repo_id)
			.await
			.map_err(DomainError::InvalidInputs)?;

		self.project_github_repo_repository.try_insert(&project_id, &github_repo_id)?;

		Ok(project_id)
	}
}
