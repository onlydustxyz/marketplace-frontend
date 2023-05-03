use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::GithubFetchRepoService;
use event_listeners::domain::{GithubEvent, GithubRepoIndex};

use super::Result;

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
}

#[async_trait]
impl super::Indexer for Indexer {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>> {
		let events = self
			.github_fetch_service
			.repo_contributors(repo_index.repo_id())
			.await?
			.into_iter()
			.map(GithubEvent::User)
			.collect();

		Ok(events)
	}
}
