use std::{future::Future, marker::PhantomData};

use async_trait::async_trait;
use event_listeners::listeners::github::Event as GithubEvent;

use super::{Indexable, Result};

pub struct Indexer<Id: Indexable, I: super::Indexer<Id>, Fut: Future<Output = bool>, F: Fn() -> Fut>
{
	indexer: I,
	guard: F,
	_phantom: PhantomData<Id>,
}

#[async_trait]
impl<
	Id: Indexable + Sync,
	I: super::Indexer<Id>,
	Fut: Future<Output = bool> + Send,
	F: Fn() -> Fut + Send + Sync,
> super::Indexer<Id> for Indexer<Id, I, Fut, F>
{
	async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
		if (self.guard)().await {
			self.indexer.index(id).await
		} else {
			Ok(vec![])
		}
	}
}

pub trait Guarded<Id: Indexable, I: super::Indexer<Id>> {
	fn guarded<Fut: Future<Output = bool>, F: Fn() -> Fut>(
		self,
		guard: F,
	) -> Indexer<Id, I, Fut, F>;
}

impl<Id: Indexable, I: super::Indexer<Id>> Guarded<Id, I> for I {
	fn guarded<Fut: Future<Output = bool>, F: Fn() -> Fut>(
		self,
		guard: F,
	) -> Indexer<Id, I, Fut, F> {
		Indexer {
			indexer: self,
			guard,
			_phantom: Default::default(),
		}
	}
}
