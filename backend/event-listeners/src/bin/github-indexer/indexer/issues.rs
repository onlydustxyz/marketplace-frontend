use std::sync::Arc;

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use domain::{GithubFetchIssueService, GithubRepoId, GithubServiceIssueFilters};
use event_listeners::domain::{GithubEvent, GithubRepoIndexRepository};
use serde::{Deserialize, Serialize};

use super::{IgnoreIndexerErrors, Result};

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchIssueService>,
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
		let state = match self.github_repo_index_repository.select_issues_indexer_state(&repo_id)? {
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
	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let filters = GithubServiceIssueFilters {
			updated_since: self.get_state(repo_id)?.map(|state| state.last_update_time),
			..Default::default()
		};

		let events = self
			.github_fetch_service
			.issues_by_repo_id(&repo_id, &filters)
			.await
			.ignore_non_fatal_errors()?
			.into_iter()
			.map(GithubEvent::Issue)
			.collect();

		Ok(events)
	}
}

impl super::Stateful<GithubRepoId> for Indexer {
	fn store(&self, id: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
		let mut updated_times: Vec<_> = events
			.iter()
			.filter_map(|event| match event {
				GithubEvent::Issue(issue) => Some(*issue.updated_at()),
				_ => None,
			})
			.collect();

		updated_times.sort();

		if let Some(updated_at) = updated_times.pop() {
			let state = State::new(updated_at);
			self.github_repo_index_repository
				.update_issues_indexer_state(&id, state.json()?)?;
		}

		Ok(())
	}
}
