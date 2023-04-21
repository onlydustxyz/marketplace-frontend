use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use serde_json::Value;

use super::Result;
use crate::{GithubRepo, GithubRepoId, GithubRepoLanguages, GithubServiceFilters};

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn repo_by_id(&self, id: &GithubRepoId) -> Result<GithubRepo>;
	async fn repo_languages(&self, id: &GithubRepoId) -> Result<GithubRepoLanguages>;
	async fn repo_events(
		&self,
		id: &GithubRepoId,
		filters: &GithubServiceFilters,
	) -> Result<Vec<Value>>;
}
