use async_trait::async_trait;
use domain::GithubRepoId;
use event_listeners::domain::GithubEvent;
use olog::info;

use super::Result;

pub struct Indexer<I: super::Indexer> {
	indexer: I,
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(repo_id).await?;

		info!("Found {} events when indexing repo {repo_id}", events.len(),);

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
