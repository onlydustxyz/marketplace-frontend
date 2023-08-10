use std::{future::Future, marker::PhantomData};

use async_trait::async_trait;

use super::{Indexable, Result};
use crate::{github_indexer::sleep, listeners::github::Event as GithubEvent};

pub enum Action {
	Sleep,
	Stop,
}

pub struct Indexer<Id: Indexable, I: super::Indexer<Id>, Fut: Future<Output = bool>, F: Fn() -> Fut>
{
	indexer: I,
	guard: F,
	action: Action,
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
	fn name(&self) -> String {
		self.indexer.name()
	}

	async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
		loop {
			if (self.guard)().await {
				return self.indexer.index(id).await;
			}

			match self.action {
				Action::Sleep => sleep().await,
				Action::Stop => return Ok(vec![]),
			}
		}
	}
}

pub trait Guarded<Id: Indexable, I: super::Indexer<Id>> {
	fn guarded<Fut: Future<Output = bool>, F: Fn() -> Fut>(
		self,
		guard: F,
		action: Action,
	) -> Indexer<Id, I, Fut, F>;
}

impl<Id: Indexable, I: super::Indexer<Id>> Guarded<Id, I> for I {
	fn guarded<Fut: Future<Output = bool>, F: Fn() -> Fut>(
		self,
		guard: F,
		action: Action,
	) -> Indexer<Id, I, Fut, F> {
		Indexer {
			indexer: self,
			guard,
			action,
			_phantom: Default::default(),
		}
	}
}
