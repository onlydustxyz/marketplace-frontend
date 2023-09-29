use super::Result;
use crate::models::{issues::Issue, pulls::PullRequest, *};

#[async_trait]
pub trait Port: Send + Sync {
	async fn repo_by_id(&self, repo_id: RepositoryId) -> Result<Repository>;

	async fn repo_by_owner_name(&self, repo_owner: String, repo_name: String)
	-> Result<Repository>;

	async fn repo_languages_by_id(&self, repo_id: RepositoryId) -> Result<Languages>;

	async fn repo_pull_requests_by_id(&self, repo_id: RepositoryId) -> Result<Vec<PullRequest>>;

	async fn repo_issues_by_id(&self, repo_id: RepositoryId) -> Result<Vec<Issue>>;
}
