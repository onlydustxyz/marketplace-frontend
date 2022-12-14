use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::GithubRepositoryId;
use infrastructure::github;

use crate::domain::{GithubRepoDetail, GithubService};

#[async_trait]
impl GithubService for github::Client {
	async fn fetch_repository_details(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<GithubRepoDetail> {
		let repo_id: i64 = (*github_repo_id).into();
		let repo = self.get_repository_by_id(repo_id as u64).await?;
		let languages = repo.language.unwrap_or_default();
		let owner = repo
			.owner
			.ok_or_else(|| anyhow!("No owner in github repository {github_repo_id}"))?;
		Ok(GithubRepoDetail::new(
			*github_repo_id,
			owner.login,
			repo.name,
			languages,
		))
	}
}
