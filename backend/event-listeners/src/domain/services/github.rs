use anyhow::Result;
use async_trait::async_trait;
use domain::GithubRepositoryId;

use crate::domain::GithubRepoDetail;

#[async_trait]
pub trait Service: Send + Sync {
	async fn fetch_repository_details(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<GithubRepoDetail>;
}
