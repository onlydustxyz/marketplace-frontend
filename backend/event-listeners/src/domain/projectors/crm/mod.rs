use std::sync::Arc;

use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{Event, GithubService, ProjectEvent, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{CrmGithubRepo, EventListener},
	infrastructure::database::CrmGithubRepoRepository,
};

pub struct Projector {
	crm_github_repo_repository: CrmGithubRepoRepository,
	github_service: Arc<dyn GithubService>,
}

impl Projector {
	pub fn new(
		crm_github_repo_repository: CrmGithubRepoRepository,
		github_service: Arc<dyn GithubService>,
	) -> Self {
		Self {
			crm_github_repo_repository,
			github_service,
		}
	}
}

#[async_trait]
impl EventListener for Projector {
	#[instrument(name = "crm_projection", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		match event {
			Event::Project(event) =>
				if let ProjectEvent::GithubRepoLinked { github_repo_id, .. } = event {
					let repo = self
						.github_service
						.repo_by_id(github_repo_id)
						.await
						.map_err(|e| SubscriberCallbackError::Fatal(anyhow!(e)))?;

					self.crm_github_repo_repository.upsert(&CrmGithubRepo::new(
						*github_repo_id,
						repo.owner().clone(),
						repo.name().clone(),
					))?;
				},
		}

		Ok(())
	}
}
