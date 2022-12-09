use crate::domain::{GithubFile, GithubFileEncoding, GithubRepository, GithubService, GithubUser};
use anyhow::{anyhow, Result};
use infrastructure::github;

#[async_trait]
impl GithubService for github::Client {
	async fn fetch_repository_by_id(&self, id: u64) -> Result<GithubRepository> {
		let repo = self.get_repository_by_id(id).await?;
		let contributors: Vec<octocrab::models::User> = if let Some(url) = &repo.contributors_url {
			self.get_as(url).await?
		} else {
			Default::default()
		};
		let readme = self.get_raw_file(&repo, "README.md").await?;

		GithubRepository::build(repo, contributors, readme.into())
	}
}

impl GithubRepository {
	pub fn build(
		repo: octocrab::models::Repository,
		contributors: Vec<octocrab::models::User>,
		readme: GithubFile,
	) -> Result<Self> {
		let repo = Self::new(
			repo.id.0 as i32,
			repo.owner.ok_or_else(|| anyhow!("Missing owner in github repository"))?.login,
			repo.name,
			contributors.into_iter().map(Into::into).collect(),
			readme,
		);

		Ok(repo)
	}
}

impl From<octocrab::models::User> for GithubUser {
	fn from(user: octocrab::models::User) -> Self {
		Self::new(user.id.0 as i32, user.login, user.avatar_url.to_string())
	}
}

impl From<octocrab::models::repos::Content> for GithubFile {
	fn from(file: octocrab::models::repos::Content) -> Self {
		Self::new(GithubFileEncoding::Base64, file.content.unwrap_or_default())
	}
}
