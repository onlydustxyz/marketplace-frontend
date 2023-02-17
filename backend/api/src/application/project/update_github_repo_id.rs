use std::sync::Arc;

use anyhow::{anyhow, Result};
use domain::{DomainError, GithubRepositoryId, ProjectId};
use tracing::instrument;

use crate::{
	domain::{GithubRepoExists, GithubService},
	infrastructure::database::{GithubRepoRepository, ProjectGithubRepoRepository},
};
pub struct Usecase {
	project_github_repo_repository: ProjectGithubRepoRepository,
	github_repo_repository: GithubRepoRepository,
	github_repo_exists: Arc<dyn GithubRepoExists>,
	github_service: Arc<dyn GithubService>,
}

impl Usecase {
	pub fn new(
		project_github_repo_repository: ProjectGithubRepoRepository,
		github_repo_repository: GithubRepoRepository,
		github_repo_exists: Arc<dyn GithubRepoExists>,
		github_service: Arc<dyn GithubService>,
	) -> Self {
		Self {
			project_github_repo_repository,
			github_repo_repository,
			github_repo_exists,
			github_service,
		}
	}

	async fn update_github_repo_details(&self, github_repo_id: &GithubRepositoryId) -> Result<()> {
		let repo = self.github_service.fetch_repository_details(github_repo_id).await?;
		self.github_repo_repository.upsert(&repo)?;
		Ok(())
	}

	#[instrument(skip(self))]
	pub async fn update_project_github_repo_id(
		&self,
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
	) -> Result<ProjectId, DomainError> {
		if !self
			.github_repo_exists
			.is_statified_by(&github_repo_id)
			.await
			.map_err(DomainError::InternalError)?
		{
			return Err(DomainError::InvalidInputs(anyhow!(
				"Github repository {github_repo_id} does not exist"
			)));
		}

		self.update_github_repo_details(&github_repo_id)
			.await
			.map_err(DomainError::InvalidInputs)?;

		self.project_github_repo_repository.delete_all_GithubRepos_of(&project_id)?;
		self.project_github_repo_repository.try_insert(&project_id, &github_repo_id)?;
		Ok(project_id)
	}
}
