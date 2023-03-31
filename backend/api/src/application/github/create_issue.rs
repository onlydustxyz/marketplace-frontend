use std::sync::Arc;

use anyhow::anyhow;
use domain::{DomainError, GithubFetchRepoService, GithubIssue, GithubRepositoryId, ProjectId};
use tracing::instrument;

use crate::{domain::GithubService, infrastructure::database::ProjectGithubRepoRepository};

pub struct Usecase {
	project_github_repo_repository: ProjectGithubRepoRepository,
	github_service: Arc<dyn GithubService>,
	github_repo_fetch_service: Arc<dyn GithubFetchRepoService>,
}

impl Usecase {
	pub fn new(
		project_github_repo_repository: ProjectGithubRepoRepository,
		github_service: Arc<dyn GithubService>,
		github_repo_fetch_service: Arc<dyn GithubFetchRepoService>,
	) -> Self {
		Self {
			project_github_repo_repository,
			github_service,
			github_repo_fetch_service,
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

		let github_repo = self
			.github_repo_fetch_service
			.repo_by_id(github_repo_id)
			.await
			.map_err(|e| DomainError::InvalidInputs(anyhow!(e)))?;

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
	use async_trait::async_trait;
	use domain::{GithubRepo, GithubServiceError};
	use mockall::{mock, predicate::eq};
	use rstest::{fixture, rstest};
	use url::Url;
	use uuid::Uuid;

	use super::*;
	use crate::domain::MockGithubService;

	mock! {
		Client {}

		#[async_trait]
		impl GithubFetchRepoService for Client {
			async fn repo_by_id(&self, id: &GithubRepositoryId) -> Result<GithubRepo, GithubServiceError>;
			async fn repo_by_url(&self, url: &Url) -> Result<GithubRepo, GithubServiceError>;
		}
	}

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
			Default::default(),
			String::from("https://github.com").parse().unwrap(),
			String::from("https://github.com").parse().unwrap(),
			Default::default(),
			Default::default(),
			Default::default(),
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

		let mut github_fetch_repo_service = MockClient::new();
		github_fetch_repo_service
			.expect_repo_by_id()
			.with(eq(github_repo_id))
			.once()
			.return_once(|_| Ok(github_repo));

		let usecase = Usecase::new(
			project_github_repo_repository,
			Arc::new(github_service),
			Arc::new(github_fetch_repo_service),
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

		let github_fetch_repo_service = MockClient::new();
		let github_service = MockGithubService::new();

		let usecase = Usecase::new(
			project_github_repo_repository,
			Arc::new(github_service),
			Arc::new(github_fetch_repo_service),
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
