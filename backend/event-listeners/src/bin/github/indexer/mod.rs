mod error;
use std::sync::Arc;

use derive_new::new;
use domain::{Destination, GithubFetchRepoService, Publisher};
use error::*;
use event_listeners::{
	domain::GithubRepoIndex, infrastructure::database::GithubRepoIndexRepository,
};
use futures::{future::try_join_all, StreamExt};
use infrastructure::amqp::UniqueMessage;
use serde_json::Value;

use crate::GITHUB_EVENTS_EXCHANGE;

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
	github_repo_index_repository: GithubRepoIndexRepository,
	event_bus: Arc<dyn Publisher<UniqueMessage<Value>>>,
}

impl Indexer {
	pub async fn index_all(&self) -> Result<()> {
		let handles = self
			.github_repo_index_repository
			.list()?
			.into_iter()
			.map(|repo_index| self.index_one(repo_index));

		try_join_all(handles).await?;

		Ok(())
	}

	async fn index_one(&self, repo_index: GithubRepoIndex) -> Result<()> {
		let events: Vec<_> = self
			.github_fetch_service
			.repo_events(repo_index.repo_id())
			.await?
			.map(UniqueMessage::new)
			.collect()
			.await;

		self.event_bus
			.publish_many(Destination::exchange(GITHUB_EVENTS_EXCHANGE), &events)
			.await?;

		self.github_repo_index_repository
			.upsert(&GithubRepoIndex::new(*repo_index.repo_id(), None))?;

		Ok(())
	}
}
