use anyhow::Result;
use infrastructure::github;

use crate::domain::{GithubFile, GithubFileEncoding, GithubRepository, GithubService, GithubUser};

#[async_trait]
impl GithubService for github::Client {
	async fn fetch_repository_by_id(&self, id: u64) -> Result<GithubRepository> {
		let repo = self.get_repository_by_id(id).await?;

		let contributors: Vec<octocrab::models::User> = match &repo.contributors_url {
			Some(url) => self.get_as(url).await?,
			None => Default::default(),
		};

		let readme = self.get_raw_file(&repo, "README.md").await?;

		Ok(GithubRepository::new(
			contributors.into_iter().map(Into::into).collect(),
			readme.into(),
		))
	}

	async fn fetch_user_by_name(&self, username: &str) -> Result<GithubUser> {
		let user = self.get_user_by_name(username).await?;
		Ok(user.into())
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
