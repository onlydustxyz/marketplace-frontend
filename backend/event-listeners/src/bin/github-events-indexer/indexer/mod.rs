mod error;
use std::sync::Arc;

use chrono::{DateTime, Utc};
use derive_new::new;
use domain::{Destination, GithubFetchRepoService, GithubServiceFilters, LogErr, Publisher};
use error::*;
use event_listeners::{
	domain::GithubRepoIndex, infrastructure::database::GithubRepoIndexRepository,
	GITHUB_EVENTS_EXCHANGE,
};
use futures::future::try_join_all;
use infrastructure::amqp::UniqueMessage;
use itertools::Itertools;
use serde_json::Value;

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
		let filters = GithubServiceFilters::new(
			None,
			repo_index
				.last_indexed_time()
				.and_then(|datetime| datetime.and_local_timezone(Utc).latest()),
		);

		let mut events =
			self.github_fetch_service.repo_events(repo_index.repo_id(), &filters).await?;

		let created_at = |event: &Value| {
			event
				.get("created_at")
				.and_then(|created_at| created_at.as_str())
				.and_then(|created_at| {
					created_at
						.parse::<DateTime<Utc>>()
						.log_err("Unable to parse field `created_at` from event")
						.ok()
				})
				.map(|created_at| created_at.naive_utc())
		};

		let last_indexed_time = events.first().and_then(created_at);

		events.sort_by_key(created_at);

		self.event_bus
			.publish_many(
				Destination::exchange(GITHUB_EVENTS_EXCHANGE),
				&events.into_iter().map(UniqueMessage::new).collect_vec(),
			)
			.await?;

		self.github_repo_index_repository.upsert(&GithubRepoIndex::new(
			*repo_index.repo_id(),
			last_indexed_time,
		))?;

		Ok(())
	}
}
