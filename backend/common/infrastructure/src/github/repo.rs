use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::GithubRepo;
use octocrab::models::Repository;

use crate::github;

#[async_trait]
pub trait RepoFromOctocrab {
	async fn try_from_octocrab_repo(
		client: &github::Client,
		repo: Repository,
	) -> Result<GithubRepo>;
}

#[async_trait]
impl RepoFromOctocrab for GithubRepo {
	async fn try_from_octocrab_repo(
		client: &github::Client,
		repo: Repository,
	) -> Result<GithubRepo> {
		let owner = repo.owner.ok_or_else(|| anyhow!("Missing field 'owner'"))?;
		let html_url = repo.html_url.ok_or_else(|| anyhow!("Missing field 'html_url'"))?;

		Ok(GithubRepo::new(
			(repo.id.0 as i64).into(),
			owner.login,
			repo.name,
			owner.avatar_url,
			html_url,
			repo.description.unwrap_or_default(),
			repo.stargazers_count.unwrap_or_default() as i32,
			repo.forks_count.unwrap_or_default() as i32,
		))
	}
}
