use std::sync::Arc;

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use domain::{
	GithubFetchPullRequestService, GithubFullPullRequest, GithubPullRequest, GithubRepoId,
	GithubServicePullRequestFilters,
};
use serde::{Deserialize, Serialize};

use super::{
	error::{IgnoreErrors, Result},
	Crawler, Projector,
};
use crate::models::GithubRepoIndexRepository;

pub type PullRequestsIndexer = dyn super::Indexer<GithubRepoId, Vec<domain::GithubPullRequest>>;

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchPullRequestService>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,

	pull_request_indexer: Arc<dyn super::Indexer<GithubPullRequest, Option<GithubFullPullRequest>>>,
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
impl Crawler<GithubRepoId, Vec<domain::GithubPullRequest>> for Indexer {
	async fn fetch_modified_data(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Vec<domain::GithubPullRequest>> {
		let filters = GithubServicePullRequestFilters {
			updated_since: self
				.get_state(*repo_id)?
				.map(|state| state.last_update_time + chrono::Duration::milliseconds(1)),
		};

		let pull_requests = self
			.github_fetch_service
			.pull_requests_by_repo_id(*repo_id, filters)
			.await
			.ignore_non_fatal_errors()?;

		Ok(pull_requests)
	}

	fn ack(&self, id: &GithubRepoId, data: Vec<domain::GithubPullRequest>) -> Result<()> {
		let mut updated_times: Vec<_> =
			data.iter().map(|pull_request| pull_request.updated_at).collect();

		updated_times.sort();

		if let Some(updated_at) = updated_times.pop() {
			let state = State::new(updated_at);
			self.github_repo_index_repository
				.update_pull_requests_indexer_state(&id, state.json()?)?;
		}

		Ok(())
	}
}

#[async_trait]
impl Projector<GithubRepoId, Vec<domain::GithubPullRequest>> for Indexer {
	async fn perform_projections(
		&self,
		_id: &GithubRepoId,
		data: Vec<domain::GithubPullRequest>,
	) -> Result<()> {
		for pull_request in data {
			self.pull_request_indexer.index(&pull_request).await?;
		}
		Ok(())
	}
}
