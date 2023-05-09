use async_trait::async_trait;
use event_listeners::domain::GithubEvent;
use olog::info;

use super::{Result, Stateful};

pub struct Indexer<I: super::Indexer> {
	indexer: I,
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	type Id = I::Id;

	async fn index(&self, id: Self::Id) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(id).await?;

		info!("Found {} events when indexing repo {id}", events.len(),);

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

impl<I: super::Indexer + super::Stateful<I::Id>> Stateful<I::Id> for Indexer<I> {
	fn store(&self, id: I::Id, events: &[GithubEvent]) -> anyhow::Result<()> {
		self.indexer.store(id, events)
	}
}
