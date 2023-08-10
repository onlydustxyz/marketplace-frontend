use std::{marker::PhantomData, sync::Arc, time::Duration};

use async_trait::async_trait;
use domain::{Destination, Publisher};
use infrastructure::amqp::UniqueMessage;

use super::{Indexable, Result, Stateful};
use crate::listeners::github::Event as GithubEvent;

pub struct Indexer<Id: Indexable, I: super::Indexer<Id>> {
	indexer: I,
	event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
	destination: Destination,
	throttle_duration: Duration,
	_phantom: PhantomData<Id>,
}

#[async_trait]
impl<Id: Indexable + Sync, I: super::Indexer<Id>> super::Indexer<Id> for Indexer<Id, I> {
	fn name(&self) -> String {
		self.indexer.name()
	}

	async fn index(&self, repo_id: Id) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(repo_id).await?;

		for event in events.clone().into_iter().map(UniqueMessage::new) {
			self.event_bus.publish(self.destination.clone(), &event).await?;
			tokio::time::sleep(self.throttle_duration).await;
		}

		Ok(events)
	}
}

pub trait Published<Id: Indexable, I: super::Indexer<Id>> {
	fn published(
		self,
		event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
		destination: Destination,
		throttle: Duration,
	) -> Indexer<Id, I>;
}

impl<Id: Indexable, I: super::Indexer<Id>> Published<Id, I> for I {
	fn published(
		self,
		event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
		destination: Destination,
		throttle_duration: Duration,
	) -> Indexer<Id, I> {
		Indexer {
			indexer: self,
			event_bus,
			destination,
			throttle_duration,
			_phantom: Default::default(),
		}
	}
}

impl<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> Stateful<Id> for Indexer<Id, I> {
	fn store(&self, id: Id, events: &[GithubEvent]) -> anyhow::Result<()> {
		self.indexer.store(id, events)
	}
}
