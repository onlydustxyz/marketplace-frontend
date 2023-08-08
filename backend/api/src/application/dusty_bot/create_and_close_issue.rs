use std::sync::Arc;

use anyhow::anyhow;
use derive_more::Constructor;
use tracing::instrument;

use common_domain::GithubFetchService;
use domain::{AggregateRootRepository, DomainError, GithubIssue, GithubRepoId, Project, ProjectId};

use crate::domain::DustyBotService;

#[derive(Constructor)]
pub struct Usecase {
	project_repository: AggregateRootRepository<Project>,
	dusty_bot_service_to_create_issue: Arc<dyn DustyBotService>,
	fetch_service: Arc<dyn GithubFetchService>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub async fn create_and_close_issue(
		&self,
		project_id: &ProjectId,
		github_repo_id: GithubRepoId,
		title: String,
		description: String,
	) -> Result<GithubIssue, DomainError> {
		let project = self.project_repository.find_by_id(project_id)?;
		if !project.github_repos().contains(&github_repo_id) {
			return Err(DomainError::InvalidInputs(anyhow!(
				"Github repository {github_repo_id} is not linked to project {project_id}"
			)));
		}

		let repository = self.fetch_service.repo_by_id(github_repo_id.clone()).await?;

		let created_issue = self
			.dusty_bot_service_to_create_issue
			.create_issue(
				github_repo_id,
				repository.owner.clone(),
				repository.name.clone(),
				title,
				description,
			)
			.await
			.map_err(DomainError::InternalError)?;

		let issue_closed = self
			.dusty_bot_service_to_create_issue
			.close_issue(
				repository.owner.clone(),
				repository.name.clone(),
				created_issue.clone(),
			)
			.await;

		if issue_closed.is_err() {
			return Err(DomainError::InternalError(anyhow!("Failed to close issue")));
		}

		Ok(created_issue)
	}
}
