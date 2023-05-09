use async_trait::async_trait;
use event_listeners::domain::GithubEvent;

use super::Result;

pub struct Indexer<I: super::Indexer + super::Stateful<I::Id>> {
	indexer: I,
}

#[async_trait]
impl<I: super::Indexer + super::Stateful<I::Id>> super::Indexer for Indexer<I> {
	type Id = I::Id;

	async fn index(&self, id: Self::Id) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(id).await?;
		self.indexer.store(&events)?;
		Ok(events)
	}
}

pub trait WithState<I: super::Indexer + super::Stateful<I::Id>> {
	fn with_state(self) -> Indexer<I>;
}

impl<I: super::Indexer + super::Stateful<I::Id>> WithState<I> for I {
	fn with_state(self) -> Indexer<I> {
		Indexer { indexer: self }
	}
}
