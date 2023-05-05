use std::time::Duration;

use async_trait::async_trait;
use event_listeners::domain::{GithubEvent, GithubRepoIndex, IndexerState};

use super::Result;

pub struct Indexer<I: super::Indexer> {
	indexer: I,
	wait_duration_per_event: Duration,
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	async fn index(
		&self,
		repo_index: GithubRepoIndex,
	) -> Result<(Vec<GithubEvent>, Option<IndexerState>)> {
		let (events, state) = self.indexer.index(repo_index.clone()).await?;

		tokio::time::sleep(self.wait_duration_per_event * (events.len() as u32)).await;

		Ok((events, state))
	}
}

pub trait Throttled<I: super::Indexer> {
	fn throttled(self, wait_duration_per_event: Duration) -> Indexer<I>;
}

impl<I: super::Indexer> Throttled<I> for I {
	fn throttled(self, wait_duration_per_event: Duration) -> Indexer<I> {
		Indexer {
			indexer: self,
			wait_duration_per_event,
		}
	}
}
