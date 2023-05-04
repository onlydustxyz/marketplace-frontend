use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::GithubFetchRepoService;
use event_listeners::domain::{GithubEvent, GithubRepoIndex};
use serde::Deserialize;

use super::Result;

static INDEXER_NAME: &str = "RepoIndexer";

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
}

#[derive(Debug, Default, Deserialize)]
struct State {
	etag: Option<String>,
}

#[async_trait]
impl super::Indexer for Indexer {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>> {
		let (etag, repo) =
			self.github_fetch_service.etagged_repo_by_id(repo_index.repo_id()).await?;

		let state: State = repo_index
			.state()
			.clone()
			.unwrap_or_default()
			.get(INDEXER_NAME)?
			.unwrap_or_default();

		if state.etag == etag {
			Ok(vec![])
		} else {
			Ok(vec![GithubEvent::Repo(repo)])
		}
	}
}
