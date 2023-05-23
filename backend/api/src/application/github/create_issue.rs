use std::sync::Arc;

use anyhow::anyhow;

use derive_more::Constructor;
use domain::{AggregateRootRepository, DomainError, GithubIssue, GithubRepoId, Project, ProjectId};

use tracing::instrument;

/// Usecase struct that holds project repository and Dusty Bot service.
#[derive(Constructor)]
pub struct Usecase {
    /// Project repository of AggregateRootRepository trait.
    project_repository: AggregateRootRepository<Project>,
    /// Dusty Bot service.
    dusty_bot_service: Arc<dyn DustyBotService>,
}

impl Usecase {
    /// Method that creates an issue on Github and returns the GithubIssue if successful, or a DomainError if not.
    #[instrument(skip(self))]
    pub async fn create_issue(
        &self,
        project_id: &ProjectId,
        github_repo_id: &GithubRepoId,
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

/// DustyBotService defines the interface for a service that can create issues on Github.
pub trait DustyBotService: Send + Sync {
    /// Method that creates an issue on Github repository with a given title and description.
    async fn create_issue(
        &self,
        github_repo_id: &GithubRepoId,
        title: &str,
        description: &str,
    ) -> Result<GithubIssue, anyhow::Error>;
}