use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, GithubRepositoryId, ProjectEvent, SubscriberCallbackError};
use infrastructure::database::MappingRepository;
use tracing::instrument;

use crate::{
	domain::{projections::Project, EventListener, GithubService, GithubServiceError},
	infrastructure::database::{
		GithubRepoDetailsRepository, ProjectLeadRepository, ProjectRepository,
		UpdateGitubRepoIdChangeset,
	},
};

pub struct Projector {
	project_repository: ProjectRepository,
	project_lead_repository: ProjectLeadRepository,
	github_service: Arc<dyn GithubService>,
	github_repo_details_repository: GithubRepoDetailsRepository,
}

impl Projector {
	pub fn new(
		project_repository: ProjectRepository,
		project_lead_repository: ProjectLeadRepository,
		github_service: Arc<dyn GithubService>,
		github_repo_details_repository: GithubRepoDetailsRepository,
	) -> Self {
		Self {
			project_repository,
			project_lead_repository,
			github_service,
			github_repo_details_repository,
		}
	}

	#[instrument(skip(self))]
	async fn project_github_data(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<(), SubscriberCallbackError> {
		let repo = self.github_service.fetch_repository_details(github_repo_id).await.map_err(
			|e| match e {
				GithubServiceError::NotFound(error)
				| GithubServiceError::MissingRepositoryOwner(error) => SubscriberCallbackError::Discard(error),
				GithubServiceError::Other(error) => SubscriberCallbackError::Fatal(error),
			},
		)?;

		self.github_repo_details_repository.upsert(&repo)?;

		Ok(())
	}
}

#[async_trait]
impl EventListener for Projector {
	#[instrument(name = "project_projection", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		match event {
			Event::Project(event) => match event {
				ProjectEvent::Created {
					id,
					name,
					github_repo_id,
				} => {
					self.project_repository.upsert(&Project::new(
						*id,
						name.to_owned(),
						(*github_repo_id).into(),
						0,
					))?;
					self.project_github_data(github_repo_id).await?;
				},
				ProjectEvent::LeaderAssigned { id, leader_id } =>
					self.project_lead_repository.upsert(id, leader_id)?,
				ProjectEvent::LeaderUnassigned { id, leader_id } =>
					self.project_lead_repository.delete(id, leader_id)?,
				ProjectEvent::GithubRepositoryUpdated { id, github_repo_id } => {
					self.project_repository
						.update(id, UpdateGitubRepoIdChangeset::new(*github_repo_id))?;
					self.project_github_data(github_repo_id).await?;
				},
				ProjectEvent::Budget { .. } => (),
			},
		}

		Ok(())
	}
}
