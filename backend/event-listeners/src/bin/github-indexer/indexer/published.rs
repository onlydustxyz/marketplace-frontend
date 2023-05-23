/// This module contains an implementation of an indexer that can publish Github events to a message bus.
use std::{marker::PhantomData, sync::Arc, time::Duration};

use async_trait::async_trait;
use domain::{Destination, Publisher};
use event_listeners::{
	domain::{GithubEvent, Indexable},
	GITHUB_EVENTS_EXCHANGE,
};
use infrastructure::amqp::UniqueMessage;

use super::{Result, Stateful};

/// An indexer that can publish Github events to a message bus.
pub struct Indexer<Id: Indexable, I: super::Indexer<Id>> {
	indexer: I,
	event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
	_phantom: PhantomData<Id>,
}

#[async_trait]
impl<Id: Indexable + Sync, I: super::Indexer<Id>> super::Indexer<Id> for Indexer<Id, I> {
	/// Indexes the given repository and publishes its events to the message bus.
	///
	/// # Arguments
	///
	/// * `repo_id` - The ID of the repository to index.
	async fn index(&self, repo_id: Id) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(repo_id).await?;

		for event in events.clone().into_iter().map(UniqueMessage::new) {
			self.event_bus
				.publish(Destination::exchange(GITHUB_EVENTS_EXCHANGE), &event)
				.await?;
			tokio::time::sleep(throttle_duration()).await;
		}

		Ok(events)
	}
}

/// Returns the throttle duration for the indexer.
fn throttle_duration() -> Duration {
	let ms = std::env::var("GITHUB_EVENTS_INDEXER_THROTTLE")
		.unwrap_or_default()
		.parse()
		.unwrap_or(1);

	Duration::from_millis(ms)
}

/// A trait for indexers that can be published to a message bus.
pub trait Published<Id: Indexable, I: super::Indexer<Id>> {
	/// Publishes the indexer to a message bus.
	///
	/// # Arguments
	///
	/// * `event_bus` - The message bus to publish to.
	fn published(self, event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>)
	-> Indexer<Id, I>;
}

impl<Id: Indexable, I: super::Indexer<Id>> Published<Id, I> for I {
	/// Publishes the indexer to a message bus.
	///
	/// # Arguments
	///
	/// * `event_bus` - The message bus to publish to.
	fn published(
		self,
		event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
	) -> Indexer<Id, I> {
		Indexer {
			indexer: self,
			event_bus,
			_phantom: Default::default(),
		}
	}
}

impl<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> Stateful<Id> for Indexer<Id, I> {
	/// Stores the events of the given repository.
	///
	/// # Arguments
	///
	/// * `id` - The ID of the repository.
	/// * `events` - The events to store.
	fn store(&self, id: Id, events: &[GithubEvent]) -> anyhow::Result<()> {
		self.indexer.store(id, events)
	}
}