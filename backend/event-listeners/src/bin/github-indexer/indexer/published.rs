use std::{sync::Arc, time::Duration};

use async_trait::async_trait;
use domain::{Destination, Publisher};
use event_listeners::{domain::GithubEvent, GITHUB_EVENTS_EXCHANGE};
use infrastructure::amqp::UniqueMessage;

use super::{Result, Stateful};

pub struct Indexer<I: super::Indexer> {
	indexer: I,
	event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	type Id = I::Id;

	async fn index(&self, repo_id: Self::Id) -> Result<Vec<GithubEvent>> {
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

fn throttle_duration() -> Duration {
	let ms = std::env::var("GITHUB_EVENTS_INDEXER_THROTTLE")
		.unwrap_or_default()
		.parse()
		.unwrap_or(1);

	Duration::from_millis(ms)
}

pub trait Published<I: super::Indexer> {
	fn published(self, event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>) -> Indexer<I>;
}

impl<I: super::Indexer> Published<I> for I {
	fn published(self, event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>) -> Indexer<I> {
		Indexer {
			indexer: self,
			event_bus,
		}
	}
}

impl<I: super::Indexer + super::Stateful<I::Id>> Stateful<I::Id> for Indexer<I> {
	fn store(&self, id: I::Id, events: &[GithubEvent]) -> anyhow::Result<()> {
		self.indexer.store(id, events)
	}
}
