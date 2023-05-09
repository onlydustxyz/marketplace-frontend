use async_trait::async_trait;
use event_listeners::domain::{GithubEvent, GithubRepoIndex};
use olog::info;

use super::Result;

pub struct Indexer<I: super::Indexer> {
	indexer: I,
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(repo_index.clone()).await?;

		info!(
			"Found {} events when indexing repo {}",
			events.len(),
			repo_index.repo_id(),
		);

		Ok(events)
	}
}

pub trait Logged<I: super::Indexer> {
	fn logged(self) -> Indexer<I>;
}

impl<I: super::Indexer> Logged<I> for I {
	fn logged(self) -> Indexer<I> {
		Indexer { indexer: self }
	}
}
