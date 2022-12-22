use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;

use super::Error;
use crate::GithubRepositoryId;

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Specification: Send + Sync {
	async fn is_statified_by(&self, github_repo_id: &GithubRepositoryId) -> Result<bool, Error>;
}
