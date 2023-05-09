use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::GithubRepoId;
use event_listeners::domain::GithubEvent;
use futures::future::try_join_all;

use super::Result;

#[derive(new)]
pub struct Indexer {
	indexers: Vec<Arc<dyn super::Indexer>>,
}

#[async_trait]
impl super::Indexer for Indexer {
	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let handles = self.indexers.iter().map(|indexer| indexer.index(repo_id));
		Ok(try_join_all(handles).await?.into_iter().flatten().collect())
	}
}
