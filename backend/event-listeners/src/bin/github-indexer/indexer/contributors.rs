use std::{collections::HashSet, sync::Arc};

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use domain::{stream_filter, GithubFetchService, GithubRepoId, GithubUser, GithubUserId, LogErr};
use event_listeners::domain::{GithubEvent, GithubUserIndexRepository};
use serde::{Deserialize, Serialize};
use stream_filter::Decision;

use super::{error::IgnoreErrors, hash, Result};

#[derive(Default, Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
	pub hash: u64,
	pub repo_ids: HashSet<GithubRepoId>,
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
		let state = match github_user_index_repository.select_contributor_indexer_state(user_id)? {
			Some(state) => {
				let state = serde_json::from_value(state)?;
				Some(state)
			},
			_ => None,
		};

		Ok(state)
	}

	fn matches(&self, user: &GithubUser, repo_id: &GithubRepoId) -> bool {
		self.hash == hash(user) && self.repo_ids.contains(repo_id)
	}

	fn with(mut self, user: &GithubUser, repo_id: GithubRepoId) -> Self {
		self.repo_ids.insert(repo_id);
		Self {
			hash: hash(user),
			last_updated_time: Utc::now(),
			..self
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

	fn update_state_with(&self, user: &GithubUser, repo_id: GithubRepoId) -> anyhow::Result<()> {
		let state = self.get_state(user.id())?.unwrap_or_default().with(user, repo_id);
		self.github_user_index_repository
			.upsert_contributor_indexer_state(user.id(), state.json()?)?;
		Ok(())
	}
}

#[async_trait]
impl super::Indexer<GithubRepoId> for Indexer {
	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let user_hash_filter = Arc::new(UserHashFilter::new(
			self.github_user_index_repository.clone(),
			repo_id,
		));

		let events = self
			.github_fetch_service
			.repo_contributors(&repo_id, user_hash_filter)
			.await
			.ignore_non_fatal_errors()?
			.into_iter()
			.map(|user| GithubEvent::User { user, repo_id })
			.collect();

		Ok(events)
	}
}

impl super::Stateful<GithubRepoId> for Indexer {
	fn store(&self, repo_id: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
		events
			.iter()
			.filter_map(|event| match event {
				GithubEvent::User { user, .. } => Some(user),
				_ => None,
			})
			.try_for_each(|user| self.update_state_with(user, repo_id))?;

		Ok(())
	}
}

#[derive(new)]
struct UserHashFilter {
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
	repo_id: GithubRepoId,
}

impl stream_filter::Filter for UserHashFilter {
	type I = GithubUser;

	fn filter(&self, user: GithubUser) -> Decision<GithubUser> {
		match State::get(self.github_user_index_repository.as_ref(), user.id())
			.log_err("Failed to retreive contributors indexer state")
		{
			Ok(Some(state)) if state.matches(&user, &self.repo_id) => Decision::Skip,
			_ => Decision::Take(user),
		}
	}
}
