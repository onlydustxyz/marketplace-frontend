use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use event_listeners::domain::{GithubEvent, GithubRepoIndex, IndexerState};
use futures::future::try_join_all;

use super::Result;

#[derive(new)]
pub struct Indexer {
	indexers: Vec<Arc<dyn super::Indexer>>,
}

#[async_trait]
impl super::Indexer for Indexer {
	async fn index(
		&self,
		repo_index: GithubRepoIndex,
	) -> Result<(Vec<GithubEvent>, Option<IndexerState>)> {
		let handles = self.indexers.iter().map(|indexer| indexer.index(repo_index.clone()));
		let results = try_join_all(handles).await?;

		Ok(results.into_iter().fold(
			(vec![], None),
			|(events, state), (other_events, other_state)| {
				(
					events.into_iter().chain(other_events).collect(),
					Some(state.unwrap_or_default().merge(other_state.unwrap_or_default())),
				)
			},
		))
	}
}
