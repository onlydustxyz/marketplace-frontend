use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, GithubRepositoryId, GithubService, ProjectEvent, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{projections::Project, EventListener, GithubRepoDetails},
	infrastructure::database::{
		GithubRepoDetailsRepository, ProjectGithubRepoDetailsRepository, ProjectLeadRepository,
		ProjectRepository,
	},
};

pub struct Projector {
	project_repository: ProjectRepository,
	project_lead_repository: ProjectLeadRepository,
	github_repo_details_repository: GithubRepoDetailsRepository,
	project_github_repo_details_repository: ProjectGithubRepoDetailsRepository,
	github_service: Arc<dyn GithubService>,
}

impl Projector {
	pub fn new(
		project_repository: ProjectRepository,
		project_lead_repository: ProjectLeadRepository,
		github_repo_details_repository: GithubRepoDetailsRepository,
		project_github_repo_details_repository: ProjectGithubRepoDetailsRepository,
		github_service: Arc<dyn GithubService>,
	) -> Self {
		Self {
			project_repository,
			project_lead_repository,
			github_repo_details_repository,
			project_github_repo_details_repository,
			github_service,
		}
	}

	async fn update_github_repo_details(&self, github_repo_id: &GithubRepositoryId) -> Result<()> {
		let languages = self.github_service.repo_languages(github_repo_id).await?.try_into()?;
		let repo_details = GithubRepoDetails::new(*github_repo_id, languages);
		self.github_repo_details_repository.upsert(&repo_details)?;
		Ok(())
	}

	fn remove_orphan_github_repo_details(&self, github_repo_id: &GithubRepositoryId) -> Result<()> {
		let projects = self
			.project_github_repo_details_repository
			.find_all_projects_of(github_repo_id)?;
		if projects.is_empty() {
			self.github_repo_details_repository.delete(github_repo_id)?;
		}
		Ok(())
	}
}

#[async_trait]
impl EventListener for Projector {
	#[instrument(name = "project_projection", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		match event {
			Event::Project(event) => match event {
				ProjectEvent::Created { id } =>
					self.project_repository.try_insert(&Project::new(*id))?,
				ProjectEvent::LeaderAssigned { id, leader_id } =>
					self.project_lead_repository.try_insert(id, leader_id)?,
				ProjectEvent::LeaderUnassigned { id, leader_id } =>
					self.project_lead_repository.delete(id, leader_id)?,
				ProjectEvent::Budget { .. } => (),
				ProjectEvent::GithubRepoLinked { id, github_repo_id } => {
					self.update_github_repo_details(github_repo_id)
						.await
						.map_err(SubscriberCallbackError::Fatal)?;
					self.project_github_repo_details_repository.try_insert(id, github_repo_id)?;
				},
				ProjectEvent::GithubRepoUnlinked { id, github_repo_id } => {
					self.project_github_repo_details_repository.delete(id, github_repo_id)?;
					self.remove_orphan_github_repo_details(github_repo_id)
						.map_err(SubscriberCallbackError::Fatal)?;
				},
			},
		}

		Ok(())
	}
}
