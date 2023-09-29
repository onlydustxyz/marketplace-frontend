use thiserror::Error;

use crate::models::{
	commits::Commit,
	issues::Issue,
	pulls::{PullRequest, Review},
	CiChecks, Repository, User,
};

#[derive(Debug, Error)]
pub enum Error {}

pub type Result<T> = std::result::Result<T, Error>;

pub trait CleanStoragePort: Send + Sync {
	fn save_repo(&self, repo: Repository) -> Result<()>;

	fn save_issue(&self, issue: Issue) -> Result<()>;

	fn save_pull_request(
		&self,
		pull_request: PullRequest,
		commits: Vec<Commit>,
		reviews: Vec<Review>,
		closing_issue_ids: Vec<u64>,
		ci_checks: Option<CiChecks>,
	) -> Result<()>;

	fn save_user(&self, user: User) -> Result<()>;
}
