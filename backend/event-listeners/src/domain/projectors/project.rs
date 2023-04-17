use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{Event, GithubRepositoryId, GithubService, ProjectEvent, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{projections::Project, EventListener, GithubRepoDetails, GithubRepoIndex},
	infrastructure::database::{
		GithubRepoDetailsRepository, GithubRepoIndexRepository, ProjectGithubRepoDetailsRepository,
		ProjectLeadRepository, ProjectRepository,
	},
};

#[derive(new)]
pub struct Projector {
	project_repository: ProjectRepository,
	project_lead_repository: ProjectLeadRepository,
	github_repo_details_repository: GithubRepoDetailsRepository,
	project_github_repo_details_repository: ProjectGithubRepoDetailsRepository,
	github_repo_index_repository: GithubRepoIndexRepository,
	github_service: Arc<dyn GithubService>,
}

impl Projector {
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
			self.github_repo_index_repository.delete(github_repo_id)?;
		}
		Ok(())
	}
}

#[async_trait]
impl EventListener<Event> for Projector {
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
					self.github_repo_index_repository
						.insert(&GithubRepoIndex::new(*github_repo_id, None))?;
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
