use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchRepoService, GithubRepoId};
use event_listeners::domain::GithubEvent;
use serde::{Deserialize, Serialize};

use super::Result;

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
	type Id = GithubRepoId;

	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let repo = self.github_fetch_service.repo_by_id(&repo_id).await?;
		Ok(vec![GithubEvent::Repo(repo)])
	}
}
