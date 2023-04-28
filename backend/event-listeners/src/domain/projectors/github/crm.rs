use anyhow::Result;
use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::{GithubRepo, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{CrmGithubRepo, EventListener, GithubEvent},
	infrastructure::database::CrmGithubRepoRepository,
};

#[derive(new)]
pub struct Projector {
	crm_github_repo_repository: CrmGithubRepoRepository,
}

#[async_trait]
impl EventListener<GithubEvent> for Projector {
	#[instrument(name = "crm_projection", skip(self))]
	async fn on_event(&self, event: &GithubEvent) -> Result<(), SubscriberCallbackError> {
		match event.clone() {
			GithubEvent::Repo(repo) => {
				let repo = repo.try_into().map_err(SubscriberCallbackError::Discard)?;
				self.crm_github_repo_repository.upsert(&repo)?;
			},
			GithubEvent::Issue(_) | GithubEvent::PullRequest(_) => (),
		}
		Ok(())
	}
}

impl TryFrom<GithubRepo> for CrmGithubRepo {
	type Error = anyhow::Error;

	fn try_from(repo: GithubRepo) -> anyhow::Result<Self> {
		Ok(Self::new(
			*repo.id(),
			repo.owner().clone(),
			repo.name().clone(),
			Some(Utc::now().naive_utc()),
		))
	}
}
