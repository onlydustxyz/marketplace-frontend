use chrono::{DateTime, Utc};
use domain::{
	models::{
		commits::Commit,
		pulls::{PullRequest, Review},
		CiChecks,
	},
	ports::output::github_api::*,
};

use crate::adapters::github_api::Client;

#[async_trait]
impl pull_request::Port for Client {
	#[allow(clippy::all)]
	async fn pull_request_by_repo_id(
		&self,
		_repo_id: u64,
		_pull_request_number: u64,
	) -> Result<PullRequest> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_requests_by_repo_id(
		&self,
		_repo_id: u64,
		_updated_since: Option<DateTime<Utc>>,
	) -> Result<Vec<PullRequest>> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_request_commits(&self, _pull_request: PullRequest) -> Result<Vec<Commit>> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_request_reviews(&self, _pull_request: PullRequest) -> Result<Vec<Review>> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_request_closing_issue_ids(&self, _pull_request: PullRequest) -> Result<Vec<u64>> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_request_ci_checks(&self, _pull_request: PullRequest) -> Result<Option<CiChecks>> {
		todo!()
	}
}
