use std::sync::Arc;

use anyhow::anyhow;
use domain::{DomainError, GithubIssue, GithubRepositoryId, ProjectId};
use tracing::instrument;

use crate::{
	domain::GithubService,
	infrastructure::database::{GithubRepoRepository, ProjectGithubRepoRepository},
};

pub struct Usecase {
	github_repo_repository: GithubRepoRepository,
	project_github_repo_repository: ProjectGithubRepoRepository,
	github_service: Arc<dyn GithubService>,
}

impl Usecase {
	pub fn new(
		github_repo_repository: GithubRepoRepository,
		project_github_repo_repository: ProjectGithubRepoRepository,
		github_service: Arc<dyn GithubService>,
	) -> Self {
		Self {
			github_repo_repository,
			project_github_repo_repository,
			github_service,
		}
	}

	#[instrument(skip(self))]
	pub async fn create_issue(
		&self,
		project_id: &ProjectId,
		github_repo_id: &GithubRepositoryId,
		title: String,
		description: String,
	) -> Result<GithubIssue, DomainError> {
		if !self.project_github_repo_repository.exists(project_id, github_repo_id)? {
			return Err(DomainError::InvalidInputs(anyhow!(
				"Github repository {github_repo_id} is not linked to project {project_id}"
			)));
		}

		let github_repo = self.github_repo_repository.find_by_id(github_repo_id)?;

		self.github_service
			.create_issue(
				github_repo.owner(),
				github_repo.name(),
				&title,
				&description,
			)
			.await
			.map_err(|e| match e {
				crate::domain::GithubServiceError::Other(_) =>
					DomainError::InternalError(anyhow!(e)),
				_ => DomainError::InvalidInputs(anyhow!(e)),
			})
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
	use crate::domain::{GithubRepo, MockGithubService};

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_str("9859fcd9-b357-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn github_repo_id() -> GithubRepositoryId {
		4324334i64.into()
	}

	const GITHUB_REPO_NAME: &str = "cool-repo-A";
	const GITHUB_REPO_OWNER: &str = "od-mocks";

	#[fixture]
	fn github_repo(github_repo_id: GithubRepositoryId) -> GithubRepo {
		GithubRepo::new(
			github_repo_id,
			GITHUB_REPO_OWNER.to_string(),
			GITHUB_REPO_NAME.to_string(),
			json!(["rust", "cairo"]),
		)
	}

	#[rstest]
	async fn test_create_issue(
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
		github_repo: GithubRepo,
	) {
		let mut project_github_repo_repository = ProjectGithubRepoRepository::default();
		project_github_repo_repository
			.expect_exists()
			.once()
			.with(eq(project_id), eq(github_repo_id))
			.returning(|_, _| Ok(true));

		let mut github_repo_repository = GithubRepoRepository::default();
		github_repo_repository
			.expect_find_by_id()
			.with(eq(github_repo_id))
			.once()
			.returning(move |_| Ok(github_repo.clone()));

		let mut github_service = MockGithubService::new();
		github_service
			.expect_create_issue()
			.with(
				eq(GITHUB_REPO_OWNER),
				eq(GITHUB_REPO_NAME),
				eq("title"),
				eq("description"),
			)
			.once()
			.returning(move |_, _, _, _| {
				Err(crate::domain::GithubServiceError::Other(anyhow!(
					"We don't need to test returned value"
				)))
			});

		let usecase = Usecase::new(
			github_repo_repository,
			project_github_repo_repository,
			Arc::new(github_service),
		);

		let error = usecase
			.create_issue(
				&project_id,
				&github_repo_id,
				"title".to_string(),
				"description".to_string(),
			)
			.await
			.unwrap_err();
		assert_matches!(error, DomainError::InternalError(_))
	}

	#[rstest]
	async fn test_create_issue_with_repo_outside_of_project(
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
	) {
		let mut project_github_repo_repository = ProjectGithubRepoRepository::default();
		project_github_repo_repository
			.expect_exists()
			.once()
			.with(eq(project_id), eq(github_repo_id))
			.returning(|_, _| Ok(false));

		let github_repo_repository = GithubRepoRepository::default();
		let github_service = MockGithubService::new();

		let usecase = Usecase::new(
			github_repo_repository,
			project_github_repo_repository,
			Arc::new(github_service),
		);

		let error = usecase
			.create_issue(
				&project_id,
				&github_repo_id,
				"title".to_string(),
				"description".to_string(),
			)
			.await
			.unwrap_err();
		assert_matches!(error, DomainError::InvalidInputs(_))
	}
}
