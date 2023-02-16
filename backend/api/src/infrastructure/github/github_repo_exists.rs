use anyhow::Result;
use async_trait::async_trait;
use domain::GithubRepositoryId;
use infrastructure::github::{Client, Error};

use crate::domain::GithubRepoExists;

#[async_trait]
impl GithubRepoExists for Client {
	async fn is_statified_by(&self, github_repo_id: &GithubRepositoryId) -> Result<bool> {
		let repo_id: i64 = (*github_repo_id).into();
		match self.get_repository_by_id(repo_id as u64).await {
			Ok(_) => Ok(true),
			Err(error) => match error {
				Error::NotFound(_) => Ok(false),
				Error::Other(error) => Err(error),
			},
		}
	}
}
