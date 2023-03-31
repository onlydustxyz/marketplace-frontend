use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{GithubRepo, GithubUser};
use octocrab::models::Repository;

use super::{user::UserFromOctocrab, Contributors};
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
		let contributors: Contributors = match client.fix_github_host(&repo.contributors_url)? {
			Some(url) => client.get_as(url).await?,
			None => Default::default(),
		};

		let owner = repo.owner.ok_or_else(|| anyhow!("Missing field 'owner'"))?;
		let html_url = repo.html_url.ok_or_else(|| anyhow!("Missing field 'html_url'"))?;

		Ok(GithubRepo::new(
			(repo.id.0 as i64).into(),
			owner.login,
			repo.name,
			contributors.into_iter().map(GithubUser::from_octocrab_user).collect(),
			owner.avatar_url,
			html_url,
			repo.description.unwrap_or_default(),
			repo.stargazers_count.unwrap_or_default() as i32,
			repo.forks_count.unwrap_or_default() as i32,
		))
	}
}
