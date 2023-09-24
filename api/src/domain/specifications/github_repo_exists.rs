use anyhow::Result;
use async_trait::async_trait;
use domain::GithubRepoId;
#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Specification: Send + Sync {
	async fn is_statified_by(&self, github_repo_id: GithubRepoId) -> Result<bool>;
}
