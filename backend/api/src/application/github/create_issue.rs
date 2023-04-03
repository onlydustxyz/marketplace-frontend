use std::sync::Arc;

use anyhow::anyhow;
use domain::{
	AggregateRootRepository, DomainError, GithubFetchRepoService, GithubIssue, GithubRepositoryId,
	Project, ProjectId,
};
use tracing::instrument;

use crate::domain::GithubService;

pub struct Usecase {
	project_repository: AggregateRootRepository<Project>,
	github_service: Arc<dyn GithubService>,
	github_fetch_repo_service: Arc<dyn GithubFetchRepoService>,
}

impl Usecase {
	pub fn new(
		project_repository: AggregateRootRepository<Project>,
		github_service: Arc<dyn GithubService>,
		github_fetch_repo_service: Arc<dyn GithubFetchRepoService>,
	) -> Self {
		Self {
			project_repository,
			github_service,
			github_fetch_repo_service,
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
		let project = self.project_repository.find_by_id(project_id)?;
		if !project.github_repos().contains(github_repo_id) {
			return Err(DomainError::InvalidInputs(anyhow!(
				"Github repository {github_repo_id} is not linked to project {project_id}"
			)));
		}

		let repo = self.github_fetch_repo_service.repo_by_id(github_repo_id).await?;

		let issue = self
			.github_service
			.create_issue(repo.owner(), repo.name(), &title, &description)
			.await?;

		Ok(issue)
	}
}
