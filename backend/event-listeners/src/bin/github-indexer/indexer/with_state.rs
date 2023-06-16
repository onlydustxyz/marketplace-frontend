use std::marker::PhantomData;

use async_trait::async_trait;
use event_listeners::domain::GithubEvent;

use super::{Indexable, Result};

pub struct Indexer<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> {
	indexer: I,
	_phantom: PhantomData<Id>,
}

#[async_trait]
impl<Id: Indexable + Sync, I: super::Indexer<Id> + super::Stateful<Id>> super::Indexer<Id>
	for Indexer<Id, I>
{
	async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(id).await?;
		self.indexer.store(id, &events)?;
		Ok(events)
	}
}

pub trait WithState<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> {
	fn with_state(self) -> Indexer<Id, I>;
}

impl<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> WithState<Id, I> for I {
	fn with_state(self) -> Indexer<Id, I> {
		Indexer {
			indexer: self,
			_phantom: Default::default(),
		}
	}
}
