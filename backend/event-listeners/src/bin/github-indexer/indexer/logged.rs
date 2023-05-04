use async_trait::async_trait;
use event_listeners::domain::{GithubEvent, GithubRepoIndex, IndexerState};
use olog::info;

use super::Result;

pub struct Indexer<I: super::Indexer> {
	indexer: I,
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	async fn index(
		&self,
		repo_index: GithubRepoIndex,
	) -> Result<(Vec<GithubEvent>, Option<IndexerState>)> {
		let (events, state) = self.indexer.index(repo_index.clone()).await?;

		info!(
			"Found {} events when indexing repo {} since {}",
			events.len(),
			repo_index.repo_id(),
			repo_index
				.last_indexed_time()
				.map(|date| date.to_string())
				.unwrap_or_else(|| String::from("forever"))
		);

		Ok((events, state))
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
