use std::{sync::Arc, time::Duration};

use async_trait::async_trait;
use domain::{Destination, Publisher};
use event_listeners::{
	domain::{GithubEvent, GithubRepoIndex},
	GITHUB_EVENTS_EXCHANGE,
};
use infrastructure::amqp::UniqueMessage;

use super::Result;

pub struct Indexer<I: super::Indexer> {
	indexer: I,
	event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
	wait_duration_per_event: Duration,
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(repo_index).await?;

		for event in events.clone().into_iter().map(UniqueMessage::new) {
			self.event_bus
				.publish(Destination::exchange(GITHUB_EVENTS_EXCHANGE), &event)
				.await?;
			tokio::time::sleep(self.wait_duration_per_event).await;
		}

		Ok(events)
	}
}

pub trait Published<I: super::Indexer> {
	fn published(
		self,
		event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
		wait_duration_per_event: Duration,
	) -> Indexer<I>;
}

impl<I: super::Indexer> Published<I> for I {
	fn published(
		self,
		event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
		wait_duration_per_event: Duration,
	) -> Indexer<I> {
		Indexer {
			indexer: self,
			event_bus,
			wait_duration_per_event,
		}
	}
}
