use std::sync::Arc;

use async_trait::async_trait;
use domain::{Destination, Publisher};
use event_listeners::{
	domain::{GithubEvent, GithubRepoIndex, IndexerState},
	GITHUB_EVENTS_EXCHANGE,
};
use infrastructure::amqp::UniqueMessage;
use itertools::Itertools;

use super::Result;

pub struct Indexer<I: super::Indexer> {
	indexer: I,
	event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>,
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	async fn index(
		&self,
		repo_index: GithubRepoIndex,
	) -> Result<(Vec<GithubEvent>, Option<IndexerState>)> {
		let (events, state) = self.indexer.index(repo_index).await?;

		self.event_bus
			.publish_many(
				Destination::exchange(GITHUB_EVENTS_EXCHANGE),
				&events.clone().into_iter().map(UniqueMessage::new).collect_vec(),
			)
			.await?;

		Ok((events, state))
	}
}

pub trait Published<I: super::Indexer> {
	fn published(self, event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>) -> Indexer<I>;
}

impl<I: super::Indexer> Published<I> for I {
	fn published(self, event_bus: Arc<dyn Publisher<UniqueMessage<GithubEvent>>>) -> Indexer<I> {
		Indexer {
			event_bus,
			indexer: self,
		}
	}
}
