use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{Event, ProjectEvent, SubscriberCallbackError};
use infrastructure::database::ImmutableRepository;
use tracing::instrument;

use super::EventListener;
use crate::models::*;

#[derive(new)]
pub struct Projector {
	project_repository: Arc<dyn ImmutableRepository<Project>>,
	project_lead_repository: Arc<dyn ImmutableRepository<ProjectLead>>,
	project_github_repos_repository: Arc<dyn ImmutableRepository<ProjectGithubRepo>>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	projects_contributors_repository: Arc<dyn ProjectsContributorRepository>,
	projects_pending_contributors_repository: Arc<dyn ProjectsPendingContributorRepository>,
}

#[async_trait]
impl EventListener<Event> for Projector {
	#[instrument(name = "project_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Project(event) = event {
			match event {
				ProjectEvent::Created { id } => {
					self.project_repository.try_insert(Project { id })?;
				},
				ProjectEvent::LeaderAssigned {
					id: project_id,
					leader_id,
					assigned_at,
				} => {
					self.project_lead_repository.try_insert(ProjectLead {
						project_id,
						user_id: leader_id,
						assigned_at,
					})?;
				},
				ProjectEvent::LeaderUnassigned { id, leader_id } => {
					self.project_lead_repository.delete((id, leader_id))?;
				},
				ProjectEvent::Budget { .. } => (),
				ProjectEvent::GithubRepoLinked {
					id: project_id,
					github_repo_id,
				} => {
					self.project_github_repos_repository.try_insert(ProjectGithubRepo {
						project_id,
						github_repo_id,
					})?;
					self.github_repo_index_repository.start_indexing(github_repo_id)?;
					self.projects_contributors_repository
						.refresh_project_contributor_list(&project_id)?;
					self.projects_pending_contributors_repository
						.refresh_project_pending_contributor_list(&project_id)?;
				},
				ProjectEvent::GithubRepoUnlinked {
					id: project_id,
					github_repo_id,
				} => {
					self.project_github_repos_repository.delete((project_id, github_repo_id))?;
					self.projects_contributors_repository
						.refresh_project_contributor_list(&project_id)?;
					self.projects_pending_contributors_repository
						.refresh_project_pending_contributor_list(&project_id)?;
				},
				ProjectEvent::Applied { .. } => (),
			}
		}

		Ok(())
	}
}
