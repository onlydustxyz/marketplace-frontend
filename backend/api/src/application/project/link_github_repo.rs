use std::sync::Arc;

use anyhow::{anyhow, Result};
use domain::{DomainError, GithubRepositoryId, ProjectId};
use tracing::instrument;

use crate::{
	domain::{GithubRepoExists, GithubService},
	infrastructure::database::{GithubRepoRepository, ProjectGithubRepoRepository},
};

pub struct Usecase {
	github_repo_repository: GithubRepoRepository,
	project_github_repo_repository: ProjectGithubRepoRepository,
	github_repo_exists: Arc<dyn GithubRepoExists>,
	github_service: Arc<dyn GithubService>,
}

impl Usecase {
	pub fn new(
		github_repo_repository: GithubRepoRepository,
		project_github_repo_repository: ProjectGithubRepoRepository,
		github_repo_exists: Arc<dyn GithubRepoExists>,
		github_service: Arc<dyn GithubService>,
	) -> Self {
		Self {
			github_repo_repository,
			project_github_repo_repository,
			github_repo_exists,
			github_service,
		}
	}

	async fn update_github_repo_details(&self, github_repo_id: &GithubRepositoryId) -> Result<()> {
		let repo = self.github_service.fetch_repository_details(github_repo_id).await?;
		self.github_repo_repository.upsert(&repo)?;
		Ok(())
	}

	fn link_github_repo_to_project(
		&self,
		project_id: &ProjectId,
		github_repo_id: &GithubRepositoryId,
	) -> Result<(), DomainError> {
		self.project_github_repo_repository.upsert(project_id, github_repo_id)?;
		Ok(())
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn link_github_repo(
		&self,
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
	) -> Result<(), DomainError> {
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

		self.link_github_repo_to_project(&project_id, &github_repo_id)?;

		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use assert_matches::assert_matches;
	use mockall::predicate::eq;
	use rstest::{fixture, rstest};
	use serde_json::json;
	use uuid::Uuid;

	use super::*;
	use crate::domain::{GithubRepo, MockGithubRepoExists, MockGithubService};

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_str("9859fcd9-b357-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn github_repo_id() -> GithubRepositoryId {
		4324334i64.into()
	}

	#[fixture]
	fn github_repo(github_repo_id: GithubRepositoryId) -> GithubRepo {
		GithubRepo::new(
			github_repo_id,
			"ofux".to_string(),
			"Foo".to_string(),
			json!(["rust", "cairo"]),
		)
	}

	#[rstest]
	async fn test_link_github_repo(
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
		github_repo: GithubRepo,
	) {
		let mut github_repo_exists = MockGithubRepoExists::new();
		github_repo_exists
			.expect_is_statified_by()
			.with(eq(github_repo_id))
			.once()
			.returning(|_| Ok(true));

		let mut github_service = MockGithubService::new();
		github_service
			.expect_fetch_repository_details()
			.with(eq(github_repo_id))
			.once()
			.returning(move |_| Ok(github_repo.clone()));

		let mut github_repo_repository = GithubRepoRepository::default();
		github_repo_repository.expect_upsert().once().returning(|_| Ok(()));

		let mut project_github_repo_repository = ProjectGithubRepoRepository::default();
		project_github_repo_repository
			.expect_upsert()
			.once()
			.with(eq(project_id), eq(github_repo_id))
			.returning(|_, _| Ok(()));

		let usecase = Usecase::new(
			github_repo_repository,
			project_github_repo_repository,
			Arc::new(github_repo_exists),
			Arc::new(github_service),
		);

		usecase.link_github_repo(project_id, github_repo_id).await.unwrap();
	}

	#[rstest]
	async fn test_link_github_repo_error_when_repo_doesnt_exist(
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
	) {
		let mut github_repo_exists = MockGithubRepoExists::new();
		github_repo_exists
			.expect_is_statified_by()
			.with(eq(github_repo_id))
			.once()
			.returning(|_| Ok(false));

		let mut github_service = MockGithubService::new();
		github_service.expect_fetch_repository_details().never();

		let mut github_repo_repository = GithubRepoRepository::default();
		github_repo_repository.expect_upsert().never();

		let mut project_github_repo_repository = ProjectGithubRepoRepository::default();
		project_github_repo_repository.expect_upsert().never();

		let usecase = Usecase::new(
			github_repo_repository,
			project_github_repo_repository,
			Arc::new(github_repo_exists),
			Arc::new(github_service),
		);

		let result = usecase.link_github_repo(project_id, github_repo_id).await;
		assert_matches!(result, Err(DomainError::InvalidInputs(..)));
	}
}
