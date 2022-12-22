use anyhow::Result;
use async_trait::async_trait;
use domain::{GithubRepoExists, GithubRepositoryId, SpecificationError};

use crate::github::{Client, Error};

#[async_trait]
impl GithubRepoExists for Client {
	async fn is_statified_by(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<bool, SpecificationError> {
		let repo_id: i64 = (*github_repo_id).into();
		match self.get_repository_by_id(repo_id as u64).await {
			Ok(_) => Ok(true),
			Err(error) => match error {
				Error::NotFound(_) => Ok(false),
				Error::Other(error) => Err(SpecificationError::Infrastructure(error)),
			},
		}
	}
}
