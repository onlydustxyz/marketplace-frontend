use std::sync::Arc;

use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;

use super::Result;
use crate::{stream_filter, GithubRepo, GithubRepoContributor, GithubRepoId, GithubRepoLanguages};

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn repo_by_id(&self, id: &GithubRepoId) -> Result<GithubRepo>;
	async fn etagged_repo_by_id(&self, id: &GithubRepoId) -> Result<(Option<String>, GithubRepo)>;
	async fn repo_languages(&self, id: &GithubRepoId) -> Result<GithubRepoLanguages>;
	async fn repo_contributors(
		&self,
		repo_id: &GithubRepoId,
		filters: Arc<dyn stream_filter::Filter<I = GithubRepoContributor>>,
	) -> Result<Vec<GithubRepoContributor>>;
}
