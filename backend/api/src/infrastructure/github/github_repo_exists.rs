use anyhow::Result;
use async_trait::async_trait;
use domain::GithubRepositoryId;
use infrastructure::{github, github::Error};

use crate::domain::GithubRepoExists;

#[async_trait]
impl GithubRepoExists for github::Client {
	async fn is_statified_by(&self, github_repo_id: &GithubRepositoryId) -> Result<bool> {
		match self.get_repository_by_id(github_repo_id).await {
			Ok(_) => Ok(true),
			Err(error) => match error {
				Error::NotFound(_) => Ok(false),
				_ => Err(error.into()),
			},
		}
	}
}
