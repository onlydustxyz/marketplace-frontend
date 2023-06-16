use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{ApplicationEvent, Event, ProjectEvent, SubscriberCallbackError};
use infrastructure::database::{ImmutableRepository, Repository};
use tracing::instrument;

use crate::{domain::EventListener, models::*};

#[derive(new)]
pub struct Projector {
	project_repository: Arc<dyn ImmutableRepository<Project>>,
	project_lead_repository: Arc<dyn ImmutableRepository<ProjectLead>>,
	project_github_repos_repository: Arc<dyn ImmutableRepository<ProjectGithubRepo>>,
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
					self.github_repo_index_repository.try_insert(GithubRepoIndex {
						repo_id: github_repo_id,
						..Default::default()
					})?;
				},
				ProjectEvent::GithubRepoUnlinked { id, github_repo_id } => {
					self.project_github_repos_repository.delete((id, github_repo_id))?;
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
