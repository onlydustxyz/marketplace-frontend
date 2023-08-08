use std::sync::Arc;

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use domain::{GithubFetchPullRequestService, GithubRepoId, GithubServicePullRequestFilters};
use serde::{Deserialize, Serialize};

use super::{error::IgnoreErrors, Result};
use crate::{listeners::github::Event as GithubEvent, models::GithubRepoIndexRepository};

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchPullRequestService>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
}

#[derive(new, Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
	last_update_time: DateTime<Utc>,
}

impl State {
	fn json(&self) -> serde_json::Result<serde_json::Value> {
		serde_json::to_value(self)
	}
}

impl Indexer {
	fn get_state(&self, repo_id: GithubRepoId) -> anyhow::Result<Option<State>> {
		let state =
			match self.github_repo_index_repository.select_pull_requests_indexer_state(&repo_id)? {
				Some(state) => {
					let state = serde_json::from_value(state)?;
					Some(state)
				},
				_ => None,
			};

		Ok(state)
	}
}

#[async_trait]
impl super::Indexer<GithubRepoId> for Indexer {
	fn name(&self) -> String {
		String::from("pull requests")
	}

	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let filters = GithubServicePullRequestFilters {
			updated_since: self
				.get_state(repo_id)?
				.map(|state| state.last_update_time + chrono::Duration::milliseconds(1)),
		};

		let events = self
			.github_fetch_service
			.pull_requests_by_repo_id(repo_id, filters)
			.await
			.ignore_non_fatal_errors()?
			.into_iter()
			.map(GithubEvent::PullRequest)
			.collect();

		Ok(events)
	}
}

impl super::Stateful<GithubRepoId> for Indexer {
	fn store(&self, id: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
		let mut updated_times: Vec<_> = events
			.iter()
			.filter_map(|event| match event {
				GithubEvent::PullRequest(pull_request) => Some(pull_request.updated_at),
				_ => None,
			})
			.collect();

		updated_times.sort();

		if let Some(updated_at) = updated_times.pop() {
			let state = State::new(updated_at);
			self.github_repo_index_repository
				.update_pull_requests_indexer_state(&id, state.json()?)?;
		}

		Ok(())
	}
}
