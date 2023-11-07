use anyhow::Result;
use domain::GithubRepoId;

#[async_trait]
pub trait Service: Send + Sync {
	async fn index_repo(&self, repo_id: GithubRepoId) -> Result<()>;
}
