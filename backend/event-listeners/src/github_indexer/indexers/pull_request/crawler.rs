use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{
	GithubCiChecks, GithubCommit, GithubFetchService, GithubFullPullRequest, GithubPullRequest,
	GithubPullRequestId, GithubServiceResult, LogErr,
};
use olog::{warn, IntoField};
use serde::{Deserialize, Serialize};

use super::{super::error::Result, Crawler};
use crate::{github_indexer::indexers::hash, models::github_pull_request_indexes};

#[derive(new)]
pub struct PullRequestCrawler {
	github_fetch_service: Arc<dyn GithubFetchService>,
	github_pull_request_index_repository: Arc<dyn github_pull_request_indexes::Repository>,
}

#[derive(Default, Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
	head_sha: String,
	base_sha: String,
	hash: u64,
}

impl State {
	fn json(&self) -> serde_json::Result<serde_json::Value> {
		serde_json::to_value(self)
	}
}

impl PullRequestCrawler {
	fn get_state(&self, pull_request_id: GithubPullRequestId) -> anyhow::Result<Option<State>> {
		let state = match self
			.github_pull_request_index_repository
			.select_pull_request_indexer_state(&pull_request_id)?
		{
			Some(state) => {
				let state = serde_json::from_value(state)?;
				Some(state)
			},
			_ => None,
		};

		Ok(state)
	}

	async fn try_get_commits(
		&self,
		pull_request: &GithubPullRequest,
		state: &State,
	) -> Option<GithubServiceResult<Vec<GithubCommit>>> {
		if state.head_sha != pull_request.head_sha || state.base_sha != pull_request.base_sha {
			Some(
				self.github_fetch_service
					.pull_request_commits(pull_request.repo_id, pull_request.number)
					.await,
			)
		} else {
			None
		}
	}

	async fn try_get_ci_checks(
		&self,
		pull_request: &GithubPullRequest,
	) -> GithubServiceResult<Option<GithubCiChecks>> {
		match pull_request.head_repo.clone() {
			Some(head_repo) =>
				self.github_fetch_service
					.ci_checks(head_repo.id, pull_request.head_sha.clone())
					.await,
			None => Ok(None),
		}
	}
}

#[async_trait]
impl Crawler<GithubPullRequest, Option<GithubFullPullRequest>> for PullRequestCrawler {
	async fn fetch_modified_data(
		&self,
		pull_request: &GithubPullRequest,
	) -> Result<Option<GithubFullPullRequest>> {
		let state = self.get_state(pull_request.id).ok().flatten().unwrap_or_default();
		if state.hash == hash(&pull_request) {
			return Ok(None);
		}

		let (commits, reviews, ci_checks, closing_issue_numbers) = tokio::join!(
			self.try_get_commits(pull_request, &state),
			self.github_fetch_service.pull_request_reviews(pull_request.clone()),
			self.try_get_ci_checks(pull_request),
			self.github_fetch_service.pull_request_closing_issues(
				pull_request.base_repo.owner.clone(),
				pull_request.base_repo.name.clone(),
				pull_request.number,
			)
		);

		let commits = commits.and_then(|result| {
			result
				.log_err(|e| {
					warn!(
						error = e.to_field(),
						repo_id = pull_request.repo_id.to_string(),
						pull_request_id = pull_request.id.to_string(),
						pull_request_number = pull_request.number.to_string(),
						"Unable to fetch commits"
					)
				})
				.ok()
		});

		let reviews = reviews
			.log_err(|e| {
				warn!(
					error = e.to_field(),
					repo_id = pull_request.repo_id.to_string(),
					pull_request_id = pull_request.id.to_string(),
					pull_request_number = pull_request.number.to_string(),
					"Unable to fetch code reviews"
				)
			})
			.ok();

		let ci_checks = ci_checks
			.log_err(|e| {
				warn!(
					error = e.to_field(),
					repo_id = pull_request.repo_id.to_string(),
					pull_request_id = pull_request.id.to_string(),
					pull_request_number = pull_request.number.to_string(),
					"Unable to fetch check runs"
				)
			})
			.ok()
			.flatten();

		let closing_issue_numbers = closing_issue_numbers
			.log_err(|e| {
				warn!(
					error = e.to_field(),
					repo_id = pull_request.repo_id.to_string(),
					pull_request_id = pull_request.id.to_string(),
					pull_request_number = pull_request.number.to_string(),
					"Unable to fetch closing issues"
				)
			})
			.ok();

		Ok(Some(GithubFullPullRequest {
			inner: pull_request.clone(),
			commits,
			reviews,
			ci_checks,
			closing_issue_numbers,
		}))
	}

	fn ack(
		&self,
		_pull_request: &GithubPullRequest,
		data: Option<GithubFullPullRequest>,
	) -> Result<()> {
		if let Some(pull_request) = data {
			self.github_pull_request_index_repository.upsert_pull_request_indexer_state(
				&pull_request.inner.id,
				State {
					hash: hash(&pull_request),
					base_sha: pull_request.inner.base_sha.clone(),
					head_sha: pull_request.inner.head_sha.clone(),
				}
				.json()?,
			)?;
		}

		Ok(())
	}
}
