use anyhow::anyhow;
use infrastructure::github;
use olog::tracing::instrument;

use super::Contributors;
use crate::domain::{
	GithubFile, GithubFileEncoding, GithubRepository, GithubService, GithubServiceError,
	GithubServiceResult, GithubUser,
};

impl From<github::Error> for GithubServiceError {
	fn from(error: github::Error) -> Self {
		match error {
			github::Error::NotFound(error) => GithubServiceError::NotFound(error),
			github::Error::Other(error) => GithubServiceError::Other(error),
		}
	}
}

#[async_trait]
impl GithubService for github::Client {
	#[instrument(skip(self))]
	async fn fetch_repository_by_id(&self, id: u64) -> GithubServiceResult<GithubRepository> {
		let repo = self.get_repository_by_id(id).await?;

		let contributors: Contributors = match &repo.contributors_url {
			Some(url) => self.get_as(url).await?,
			None => Default::default(),
		};

		let readme = match self.get_raw_file(&repo, "README.md").await {
			Ok(readme) => Some(readme),
			Err(github::Error::NotFound(_)) => None,
			Err(error) => return Err(error.into()),
		};

		let owner = repo.owner.ok_or_else(|| {
			GithubServiceError::MissingRepositoryOwner(anyhow!(
				"Missing owner in github repository"
			))
		})?;

		Ok(GithubRepository::new(
			contributors.into_iter().map(Into::into).collect(),
			readme.map(Into::into),
			owner.avatar_url.to_string(),
		))
	}

	#[instrument(skip(self))]
	async fn fetch_user_by_name(&self, username: &str) -> GithubServiceResult<GithubUser> {
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
