use std::sync::Arc;

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use domain::{
	GithubFetchIssueService, GithubRepoId, GithubServiceIssueFilters, GithubUserId, LogErr,
};
use event_listeners::domain::{GithubEvent, GithubRepoIndexRepository, GithubUserIndexRepository};
use serde::{Deserialize, Serialize};

use super::{IgnoreIndexerErrors, Result};

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchIssueService>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
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

	fn index_author(&self, user_id: &GithubUserId) {
		let _ = self
			.github_user_index_repository
			.try_insert(user_id)
			.log_err("Failed to add issue's author to user indexes");
	}
}

#[async_trait]
impl super::Indexer<GithubRepoId> for Indexer {
	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let filters = GithubServiceIssueFilters {
			updated_since: self
				.get_state(repo_id)?
				.map(|state| state.last_update_time + chrono::Duration::milliseconds(1)),
			..Default::default()
		};

		let events = self
			.github_fetch_service
			.issues_by_repo_id(&repo_id, &filters)
			.await
			.ignore_non_fatal_errors()?
			.into_iter()
			.flat_map(|issue| {
				self.index_author(issue.author.id());
				vec![
					GithubEvent::Issue(issue.clone()),
					GithubEvent::User {
						user: issue.author,
						repo_id: Some(repo_id),
					},
				]
			})
			.collect();

		Ok(events)
	}
}

impl super::Stateful<GithubRepoId> for Indexer {
	fn store(&self, id: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
		let mut updated_times: Vec<_> = events
			.iter()
			.filter_map(|event| match event {
				GithubEvent::Issue(issue) => Some(issue.updated_at),
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
