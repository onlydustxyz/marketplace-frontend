use anyhow::Result;
use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::SubscriberCallbackError;
use tracing::instrument;

use super::GithubEvent;
use crate::{
	domain::{CrmGithubRepo, EventListener},
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
		if let Some((owner, name)) = event.0.repo.name.split_once('/') {
			self.crm_github_repo_repository.upsert(&CrmGithubRepo::new(
				(event.0.repo.id.0 as i64).into(),
				owner.to_string(),
				name.to_string(),
				Some(Utc::now().naive_utc()),
			))?;
		}

		Ok(())
	}
}
