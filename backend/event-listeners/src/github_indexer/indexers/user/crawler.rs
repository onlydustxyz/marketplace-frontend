use std::sync::Arc;

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use domain::{GithubFetchService, GithubFullUser, GithubUserId};
use serde::{Deserialize, Serialize};

use super::{super::error::Result, Crawler};
use crate::{
	github_indexer::indexers::{error::IgnoreErrors, hash},
	models::GithubUserIndexRepository,
};

#[derive(new)]
pub struct UserCrawler {
	github_fetch_service: Arc<dyn GithubFetchService>,
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
}

#[derive(Default, Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
	pub hash: u64,
	pub last_updated_time: DateTime<Utc>,
	#[serde(default)]
	pub last_indexed_time: DateTime<Utc>,
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
			last_indexed_time: Utc::now(),
		}
	}

	fn touched(self) -> Self {
		Self {
			last_indexed_time: Utc::now(),
			..self
		}
	}
}

impl UserCrawler {
	fn get_state(&self, user_id: &GithubUserId) -> anyhow::Result<Option<State>> {
		State::get(self.github_user_index_repository.as_ref(), user_id)
	}

	fn update_state_with(&self, user: &GithubFullUser) -> anyhow::Result<()> {
		let state = self.get_state(user.id())?.unwrap_or_default().with(user);
		self.github_user_index_repository
			.update_user_indexer_state(user.id(), state.json()?)?;
		Ok(())
	}

	fn touch_state(&self, user_id: &GithubUserId) -> anyhow::Result<()> {
		if let Some(state) = self.get_state(user_id)? {
			self.github_user_index_repository
				.update_user_indexer_state(user_id, state.touched().json()?)?;
		}
		Ok(())
	}
}

#[async_trait]
impl Crawler<GithubUserId, Option<GithubFullUser>> for UserCrawler {
	async fn fetch_modified_data(&self, user_id: &GithubUserId) -> Result<Option<GithubFullUser>> {
		let state = self.get_state(&user_id)?;

		let user = self
			.github_fetch_service
			.full_user_by_id(&user_id)
			.await
			.map(Some)
			.ignore_non_fatal_errors()?
			.filter(|user| match state {
				Some(state) if state.matches(&user) => false,
				_ => true,
			});

		Ok(user)
	}

	fn ack(&self, user_id: &GithubUserId, data: Option<GithubFullUser>) -> Result<()> {
		if let Some(user) = data {
			self.update_state_with(&user)?;
		} else {
			self.touch_state(&user_id)?;
		}
		Ok(())
	}
}
