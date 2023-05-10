use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{stream_filter, GithubFetchService, GithubRepoId, GithubUser, GithubUserId};
use event_listeners::domain::{GithubEvent, GithubUserIndexRepository};
use olog::error;
use serde::{Deserialize, Serialize};

use super::{IgnoreIndexerErrors, Result};
use crate::indexer::hash;

#[derive(Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
	hash: u64,
}

impl State {
	pub fn new(user: &GithubUser) -> Self {
		Self { hash: hash(user) }
	}

	fn json(&self) -> serde_json::Result<serde_json::Value> {
		serde_json::to_value(self)
	}
}

pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchService>,
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
	user_hash_filter: Arc<UserHashFilter>,
}

impl Indexer {
	pub fn new(
		github_fetch_service: Arc<dyn GithubFetchService>,
		github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
	) -> Self {
		Indexer {
			github_fetch_service,
			github_user_index_repository: github_user_index_repository.clone(),
			user_hash_filter: Arc::new(UserHashFilter::new(github_user_index_repository)),
		}
	}
}

#[async_trait]
impl super::Indexer<GithubUserId> for Indexer {
	async fn index(&self, user_id: GithubUserId) -> Result<Vec<GithubEvent>> {
		let events = self
			.github_fetch_service
			.user_by_id(&user_id)
			.await
			.map(|user| vec![GithubEvent::User(user)])
			.ignore_non_fatal_errors()?;

		Ok(events)
	}
}

impl super::Stateful<GithubUserId> for Indexer {
	fn store(&self, id: GithubUserId, events: &[GithubEvent]) -> anyhow::Result<()> {
		if let Some(GithubEvent::User(user)) = events.last() {
			let state = State::new(user);
			self.github_user_index_repository
				.upsert_user_indexer_state(&id, state.json()?)?;
		}
		Ok(())
	}
}

#[async_trait]
impl super::Indexer<GithubRepoId> for Indexer {
	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let events = self
			.github_fetch_service
			.repo_contributors(&repo_id, self.user_hash_filter.clone())
			.await
			.ignore_non_fatal_errors()?
			.into_iter()
			.map(GithubEvent::User)
			.collect();

		Ok(events)
	}
}

impl super::Stateful<GithubRepoId> for Indexer {
	fn store(&self, _: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
		events
			.iter()
			.filter_map(|event| match event {
				GithubEvent::User(user) => Some(user),
				_ => None,
			})
			.try_for_each(|user| {
				self.github_user_index_repository
					.upsert_user_indexer_state(user.id(), State::new(user).json()?)?;
				anyhow::Ok(())
			})?;
		Ok(())
	}
}

#[derive(new)]
struct UserHashFilter {
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
}

impl stream_filter::Filter for UserHashFilter {
	type I = GithubUser;

	fn filter(&self, user: GithubUser) -> stream_filter::Decision<GithubUser> {
		match self.get_state(user.id()) {
			Ok(state) => match state {
				Some(state) if state == State::new(&user) => stream_filter::Decision::Skip,
				_ => stream_filter::Decision::Take(user),
			},
			Err(error) => {
				error!(
					error = error.to_string(),
					user = user.id().to_string(),
					"Failed to retreive contributors indexer state"
				);
				stream_filter::Decision::Skip
			},
		}
	}
}

impl UserHashFilter {
	fn get_state(&self, user_id: &GithubUserId) -> anyhow::Result<Option<State>> {
		let state = match self.github_user_index_repository.select_user_indexer_state(user_id)? {
			Some(state) => {
				let state = serde_json::from_value(state)?;
				Some(state)
			},
			_ => None,
		};

		Ok(state)
	}
}
