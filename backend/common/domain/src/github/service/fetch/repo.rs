use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use serde_json::Value;

use super::Result;
use crate::{GithubRepo, GithubRepoLanguages, GithubRepositoryId, GithubServiceFilters};

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn repo_by_id(&self, id: &GithubRepositoryId) -> Result<GithubRepo>;
	async fn repo_languages(&self, id: &GithubRepositoryId) -> Result<GithubRepoLanguages>;
	async fn repo_events(
		&self,
		id: &GithubRepositoryId,
		filters: &GithubServiceFilters,
	) -> Result<Vec<Value>>;
}
