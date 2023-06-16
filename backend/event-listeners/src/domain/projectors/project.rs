use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{ApplicationEvent, Event, ProjectEvent, SubscriberCallbackError};
use infrastructure::database::{ImmutableRepository, Repository};
use tracing::instrument;

use crate::{
	domain::{projections::Project, Application, EventListener, GithubRepoIndexRepository},
	infrastructure::database::{ProjectGithubReposRepository, ProjectLeadRepository},
};

#[derive(new)]
pub struct Projector {
	project_repository: Arc<dyn ImmutableRepository<Project>>,
	project_lead_repository: ProjectLeadRepository,
	project_github_repos_repository: ProjectGithubReposRepository,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	applications_repository: Arc<dyn Repository<Application>>,
}

#[async_trait]
impl EventListener<Event> for Projector {
	#[instrument(name = "project_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		match event {
			Event::Project(event) => match event {
				ProjectEvent::Created { id } => {
					self.project_repository.try_insert(Project { id })?;
				},
				ProjectEvent::LeaderAssigned {
					id,
					leader_id,
					assigned_at,
				} => self.project_lead_repository.try_insert_with_metadata(
					&id,
					&leader_id,
					&assigned_at,
				)?,
				ProjectEvent::LeaderUnassigned { id, leader_id } =>
					self.project_lead_repository.delete(&id, &leader_id)?,
				ProjectEvent::Budget { .. } => (),
				ProjectEvent::GithubRepoLinked { id, github_repo_id } => {
					self.project_github_repos_repository.try_insert(&id, &github_repo_id)?;
					self.github_repo_index_repository.try_insert(&github_repo_id)?;
				},
				ProjectEvent::GithubRepoUnlinked { id, github_repo_id } => {
					self.project_github_repos_repository.delete(&id, &github_repo_id)?;
				},
				ProjectEvent::Application {
					id: project_id,
					event,
				} => {
					let ApplicationEvent::Received {
						id,
						applicant_id,
						received_at,
					} = event;
					self.applications_repository.upsert(Application {
						id,
						project_id,
						applicant_id,
						received_at,
					})?;
				},
			},
		}

		Ok(())
	}
}
