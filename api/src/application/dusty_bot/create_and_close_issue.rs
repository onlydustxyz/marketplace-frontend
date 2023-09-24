use std::sync::Arc;

use anyhow::anyhow;
use common_domain::GithubFetchService;
use derive_more::Constructor;
use domain::{AggregateRepository, DomainError, GithubIssue, GithubRepoId, Project, ProjectId};
use tracing::instrument;

use crate::domain::DustyBotService;

#[derive(Constructor)]
pub struct Usecase {
	project_repository: AggregateRepository<Project>,
	dusty_bot_service: Arc<dyn DustyBotService>,
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
		if !project.github_repos.contains(&github_repo_id) {
			return Err(DomainError::InvalidInputs(anyhow!(
				"Github repository {github_repo_id} is not linked to project {project_id}"
			)));
		}

		let repository = self.fetch_service.repo_by_id(github_repo_id).await?;

		let created_issue = self
			.dusty_bot_service
			.create_issue(
				github_repo_id,
				repository.owner.clone(),
				repository.name.clone(),
				title,
				description,
			)
			.await
			.map_err(DomainError::InternalError)?;

		self.dusty_bot_service
			.close_issue(
				repository.owner.clone(),
				repository.name.clone(),
				created_issue.clone(),
			)
			.await
			.map_err(DomainError::InternalError)
	}
}
