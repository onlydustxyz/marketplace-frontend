use std::sync::Arc;

use anyhow::anyhow;
use async_trait::async_trait;
use derive_new::new;
use domain::{
	GithubCommit, GithubFetchService, GithubFullPullRequest, GithubPullRequest,
	GithubPullRequestId, GithubServiceResult, LogErr, SubscriberCallbackError,
};
use olog::{warn, IntoField};
use serde::{Deserialize, Serialize};

use super::Result;
use crate::{
	listeners::{github::Event as GithubEvent, EventListener},
	models::github_pull_request_indexes,
};

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchService>,
	github_pull_request_index_repository: Arc<dyn github_pull_request_indexes::Repository>,
}

#[derive(Default, Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
	head_sha: String,
	base_sha: String,
}

impl State {
	fn json(&self) -> serde_json::Result<serde_json::Value> {
		serde_json::to_value(self)
	}
}

impl Indexer {
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
	) -> Option<GithubServiceResult<Vec<GithubCommit>>> {
		let state = self.get_state(pull_request.id).ok().flatten().unwrap_or_default();

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
}

#[async_trait]
impl super::Indexer<GithubPullRequest> for Indexer {
	fn name(&self) -> String {
		String::from("full_pull_request")
	}

	async fn index(&self, pull_request: GithubPullRequest) -> Result<Vec<GithubEvent>> {
		let (commits, reviews, ci_checks, closing_issue_numbers) = tokio::join!(
			self.try_get_commits(&pull_request),
			self.github_fetch_service.pull_request_reviews(pull_request.clone()),
			self.github_fetch_service
				.ci_checks(pull_request.head_repo.id, pull_request.head_sha.clone()),
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

		Ok(vec![GithubEvent::FullPullRequest(GithubFullPullRequest {
			inner: pull_request,
			commits,
			reviews,
			ci_checks,
			closing_issue_numbers,
		})])
	}
}

impl super::Stateful<GithubPullRequest> for Indexer {
	fn store(
		&self,
		pull_request: GithubPullRequest,
		_events: &[GithubEvent],
	) -> anyhow::Result<()> {
		self.github_pull_request_index_repository.update_pull_request_indexer_state(
			&pull_request.id,
			State {
				base_sha: pull_request.base_sha,
				head_sha: pull_request.head_sha,
			}
			.json()?,
		)?;

		Ok(())
	}
}

#[async_trait]
impl<I: super::Indexer<GithubPullRequest>> EventListener<GithubEvent> for I {
	async fn on_event(
		&self,
		event: GithubEvent,
	) -> std::result::Result<(), SubscriberCallbackError> {
		if let GithubEvent::PullRequest(pull_request) = event {
			self.index(pull_request)
				.await
				.map_err(|e| SubscriberCallbackError::Fatal(anyhow!(e)))?;
		}
		Ok(())
	}
}
