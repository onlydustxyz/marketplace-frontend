use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{Event, ProjectEvent, SubscriberCallbackError};
use tracing::instrument;

/// A projector that listens to project events and updates the projection accordingly.
#[derive(new)]
pub struct Projector {
    /// The repository for `Project` entities.
    project_repository: ProjectRepository,
    /// The repository for `ProjectLead` entities.
    project_lead_repository: ProjectLeadRepository,
    /// The repository for `ProjectGithubRepo` entities.
    project_github_repos_repository: ProjectGithubReposRepository,
    /// The repository for the index of GitHub repos.
    github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
}

#[async_trait]
impl EventListener<Event> for Projector {
    /// Handles project events and updates the projection accordingly.
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
                    self.project_github_repos_repository.try_insert(id, github_repo_id)?;
                    self.github_repo_index_repository.try_insert(github_repo_id)?;
                },
                ProjectEvent::GithubRepoUnlinked { id, github_repo_id } => {
                    self.project_github_repos_repository.delete(id, github_repo_id)?;
                },
            },
        }

        Ok(())
    }
}