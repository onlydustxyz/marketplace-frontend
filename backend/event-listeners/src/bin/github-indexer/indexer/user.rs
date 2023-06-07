use std::sync::Arc;

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use domain::{GithubFetchService, GithubFullUser, GithubUserId};
use event_listeners::domain::{GithubEvent, GithubUserIndexRepository};
use serde::{Deserialize, Serialize};

use super::{hash, IgnoreIndexerErrors, Result};

#[derive(Default, Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
	pub hash: u64,
	pub last_updated_time: DateTime<Utc>,
}

impl State {
	pub fn json(&self) -> serde_json::Result<serde_json::Value> {
		serde_json::to_value(self)
	}

	fn get(
		github_user_index_repository: &dyn GithubUserIndexRepository,
		user_id: &GithubUserId,
	) -> anyhow::Result<Option<State>> {
		let state = match github_user_index_repository.select_user_indexer_state(user_id)? {
			Some(state) => {
				let state = serde_json::from_value(state)?;
				Some(state)
			},
			_ => None,
		};

		Ok(state)
	}

	fn matches(&self, user: &GithubFullUser) -> bool {
		self.hash == hash(user)
	}

	fn with(self, user: &GithubFullUser) -> Self {
		Self {
			hash: hash(user),
			last_updated_time: Utc::now(),
		}
	}
}

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchService>,
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
}

impl Indexer {
	fn get_state(&self, user_id: &GithubUserId) -> anyhow::Result<Option<State>> {
		State::get(self.github_user_index_repository.as_ref(), user_id)
	}

	fn update_state_with(&self, user: &GithubFullUser) -> anyhow::Result<()> {
		let state = self.get_state(user.id())?.unwrap_or_default().with(user);
		self.github_user_index_repository
			.update_user_indexer_state(user.id(), state.json()?)?;
		Ok(())
	}
}

#[async_trait]
impl super::Indexer<GithubUserId> for Indexer {
	async fn index(&self, user_id: GithubUserId) -> Result<Vec<GithubEvent>> {
		let user = self
			.github_fetch_service
			.full_user_by_id(&user_id)
			.await
			.map(Some)
			.ignore_non_fatal_errors()?;

		let events = if let Some(user) = user {
			match self.get_state(&user_id)? {
				Some(state) if state.matches(&user) => vec![],
				_ => vec![GithubEvent::FullUser(user)],
			}
		} else {
			vec![]
		};

		Ok(events)
	}
}

impl super::Stateful<GithubUserId> for Indexer {
	fn store(&self, _: GithubUserId, events: &[GithubEvent]) -> anyhow::Result<()> {
		if let Some(GithubEvent::FullUser(user)) = events.last() {
			self.update_state_with(user)?;
		}
		Ok(())
	}
}
