use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchRepoService, GithubRepoId};
use event_listeners::domain::GithubEvent;

use super::Result;
use crate::indexer::Stateful;

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
}

#[async_trait]
impl super::Indexer for Indexer {
	type Id = GithubRepoId;

	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let state: diesel::select();

		let repo = self.github_fetch_service.repo_by_id(&repo_id).await?;

		if hash(repo) != state.hash() {
			Ok(vec![GithubEvent::Repo(repo)])
		} else {
			Ok(vec![])
		}
	}
}

impl super::Stateful<GithubRepoId> for Indexer {
	fn store(&self, id: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
		diesel::update();
		Ok(())
	}
}
