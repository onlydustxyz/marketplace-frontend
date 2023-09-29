use chrono::{DateTime, Utc};

use super::Result;
use crate::models::{
	commits::Commit,
	pulls::{PullRequest, Review},
	CiChecks,
};

#[async_trait]
pub trait Port: Send + Sync {
	async fn pull_request_by_repo_id(
		&self,
		repo_id: u64,
		pull_request_number: u64,
	) -> Result<PullRequest>;

	async fn pull_requests_by_repo_id(
		&self,
		repo_id: u64,
		updated_since: Option<DateTime<Utc>>,
	) -> Result<Vec<PullRequest>>;

	async fn pull_request_commits(&self, pull_request: PullRequest) -> Result<Vec<Commit>>;

	async fn pull_request_reviews(&self, pull_request: PullRequest) -> Result<Vec<Review>>;

	async fn pull_request_closing_issue_ids(&self, pull_request: PullRequest) -> Result<Vec<u64>>;

	async fn pull_request_ci_checks(&self, pull_request: PullRequest) -> Result<Option<CiChecks>>;
}
