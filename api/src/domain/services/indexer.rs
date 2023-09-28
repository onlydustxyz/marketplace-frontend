use anyhow::Result;
use domain::{
	GithubIssueNumber, GithubPullRequestId, GithubPullRequestNumber, GithubRepoId, GithubUserId,
};

#[async_trait]
pub trait Service: Send + Sync {
	async fn index_repo(&self, repo_id: GithubRepoId) -> Result<()>;
	async fn index_user(&self, user_id: GithubUserId) -> Result<()>;
	async fn index_issue(
		&self,
		repo_id: GithubRepoId,
		issue_number: GithubIssueNumber,
	) -> Result<()>;

	async fn index_pull_request_by_repo_id(
		&self,
		repo_id: GithubRepoId,
		pr_number: GithubPullRequestNumber,
	) -> Result<()>;

	async fn index_pull_request_by_repo_owner_name(
		&self,
		repo_owner: String,
		repo_name: String,
		pr_number: GithubPullRequestNumber,
	) -> Result<GithubPullRequestId>;
}
