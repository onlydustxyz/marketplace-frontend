use std::{marker::PhantomData, time::Instant};

use async_trait::async_trait;
use olog::info;

use super::{Indexable, Result, Stateful};
use crate::listeners::github::Event as GithubEvent;

pub struct Indexer<Id: Indexable, I: super::Indexer<Id>> {
	indexer: I,
	_phantom: PhantomData<Id>,
}

#[async_trait]
impl<Id: Indexable + Sync, I: super::Indexer<Id>> super::Indexer<Id> for Indexer<Id, I> {
	fn name(&self) -> String {
		self.indexer.name()
	}

	async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
		let start = Instant::now();
		let events = self.indexer.index(id.clone()).await?;
		let duration = start.elapsed();

		info!(
			events_count = events.len(),
			duration = duration.as_secs(),
			"Finished indexing {} for {} {id}",
			self.name(),
			std::any::type_name::<Id>()
		);

		Ok(events)
	}
}

pub trait Logged<Id: Indexable, I: super::Indexer<Id>> {
	fn logged(self) -> Indexer<Id, I>;
}

impl<Id: Indexable, I: super::Indexer<Id>> Logged<Id, I> for I {
	fn logged(self) -> Indexer<Id, I> {
		Indexer {
			indexer: self,
			_phantom: Default::default(),
		}
	}
}

impl<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> Stateful<Id> for Indexer<Id, I> {
	fn store(&self, id: Id, events: &[GithubEvent]) -> anyhow::Result<()> {
		self.indexer.store(id, events)
	}
}
