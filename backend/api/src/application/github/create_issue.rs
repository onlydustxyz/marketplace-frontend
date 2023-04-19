use std::sync::Arc;

use anyhow::anyhow;
use derive_more::Constructor;
use domain::{
	AggregateRootRepository, DomainError, GithubIssue, GithubRepositoryId, Project, ProjectId,
};
use tracing::instrument;

use crate::domain::DustyBotService;

#[derive(Constructor)]
pub struct Usecase {
	project_repository: AggregateRootRepository<Project>,
	dusty_bot_service: Arc<dyn DustyBotService>,
}

impl Usecase {
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

		self.dusty_bot_service
			.create_issue(github_repo_id, &title, &description)
			.await
			.map_err(DomainError::InternalError)
	}
}
