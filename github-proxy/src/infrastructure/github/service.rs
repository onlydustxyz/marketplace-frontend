use crate::domain::{GithubRepository, GithubService};
use anyhow::{anyhow, Result};
use infrastructure::github;

#[async_trait]
impl GithubService for github::Client {
	async fn fetch_repository_by_id(&self, id: u64) -> Result<GithubRepository> {
		self.get_repository_by_id(id).await?.try_into()
	}
}

impl TryFrom<octocrab::models::Repository> for GithubRepository {
	type Error = anyhow::Error;

	fn try_from(repo: octocrab::models::Repository) -> Result<Self, Self::Error> {
		let repo = Self::new(
			repo.id.0 as i32,
			repo.owner.ok_or_else(|| anyhow!("Missing owner in github repository"))?.login,
			repo.name,
		);
		Ok(repo)
	}
}
