use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::GithubFetchRepoService;
use event_listeners::domain::{GithubEvent, GithubRepoIndex, IndexerState};
use serde::{Deserialize, Serialize};

use super::Result;

static INDEXER_NAME: &str = "RepoIndexer";

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
}

#[derive(Debug, Default, Serialize, Deserialize)]
struct State {
	etag: Option<String>,
}

#[async_trait]
impl super::Indexer for Indexer {
	async fn index(
		&self,
		repo_index: GithubRepoIndex,
	) -> Result<(Vec<GithubEvent>, Option<IndexerState>)> {
		let (etag, repo) =
			self.github_fetch_service.etagged_repo_by_id(repo_index.repo_id()).await?;

		let mut state = repo_index.state().clone().unwrap_or_default();
		let indexer_state: State = state.get(INDEXER_NAME)?.unwrap_or_default();

		if indexer_state.etag == etag {
			Ok((vec![], Some(state)))
		} else {
			state.set(INDEXER_NAME, State { etag })?;
			Ok((vec![GithubEvent::Repo(repo)], Some(state)))
		}
	}
}
