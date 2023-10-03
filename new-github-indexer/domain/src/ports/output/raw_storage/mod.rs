pub mod commits;
pub mod issue;
pub mod pull_request;
pub mod repo;
pub mod user;

use thiserror::Error;
#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
	#[error(transparent)]
	Other(anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

#[async_trait]
pub trait Port:
	issue::Port + pull_request::Port + repo::Port + user::Port + commits::Port + Send + Sync
{
}

impl<P> Port for P where
	P: issue::Port + pull_request::Port + repo::Port + user::Port + commits::Port + Send + Sync
{
}

#[cfg(test)]
pub use test::MockPort;

#[cfg(test)]
mod test {
	use super::{
		commits::Port as CommitsPort, issue::Port as IssuePort,
		pull_request::Port as PullRequestPort, repo::Port as RepoPort, user::Port as UserPort,
		Result,
	};
	use crate::models::{issues::Issue, pulls::PullRequest, *};

	mock! {
		pub Port {}

		#[async_trait]
		impl IssuePort for Port {
			async fn issue_by_repo_id(&self, repo_id: RepositoryId, issue_number: u64) -> Result<issues::Issue>;

			async fn issue_by_repo_owner_name(
				&self,
				repo_owner: String,
				repo_name: String,
				issue_number: u64,
			) -> Result<issues::Issue>;
		}

		#[async_trait]
		impl PullRequestPort for Port {
			async fn pull_request_by_repo_id(
				&self,
				repo_id: RepositoryId,
				pull_request_number: u64,
			) -> Result<PullRequest>;

			async fn pull_request_by_repo_owner_name(
				&self,
				repo_owner: String,
				repo_name: String,
				pull_request_number: u64,
			) -> Result<PullRequest>;

			async fn pull_request_commits_by_repo_id(
				&self,
				repo_id: RepositoryId,
				pull_request_number: u64,
			) -> Result<Vec<repos::RepoCommit>>;

			async fn pull_request_reviews_by_repo_id(
				&self,
				repo_id: RepositoryId,
				pull_request_number: u64,
			) -> Result<Vec<pulls::Review>>;

			async fn closing_issues_by_repo_owner_name(
				&self,
				repo_owner: String,
				repo_name: String,
				pull_request_number: u64,
			) -> Result<Vec<IssueId>>;
		}

		#[async_trait]
		impl RepoPort for Port {
			async fn repo_by_id(&self, repo_id: RepositoryId) -> Result<Repository>;

			async fn repo_by_owner_name(&self, repo_owner: String, repo_name: String)
			-> Result<Repository>;

			async fn repo_languages_by_id(&self, repo_id: RepositoryId) -> Result<Languages>;

			async fn repo_pull_requests_by_id(&self, repo_id: RepositoryId) -> Result<Vec<PullRequest>>;

			async fn repo_issues_by_id(&self, repo_id: RepositoryId) -> Result<Vec<Issue>>;
		}

		#[async_trait]
		impl UserPort for Port {
			async fn user_by_id(&self, user_id: UserId) -> Result<User>;
			async fn user_by_name(&self, username: String) -> Result<User>;

			async fn user_social_accounts_by_id(&self, user_id: UserId) -> Result<Vec<SocialAccount>>;
		}

		#[async_trait]
		impl CommitsPort for Port {
			async fn commit_check_runs_by_repo_id(
				&self,
				repo_id: RepositoryId,
				sha: String,
			) -> Result<CheckRuns>;
		}
	}
}
