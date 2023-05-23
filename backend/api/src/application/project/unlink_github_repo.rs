use std::sync::Arc;

use anyhow::Result;
use domain::{
    AggregateRootRepository, DomainError, Event, GithubRepoId, Project, ProjectId, Publisher,
};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

/// A usecase for unlinking a GitHub repository from a project.
pub struct Usecase {
    /// The event publisher used to publish events when a repository is unlinked from a project.
    event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
    /// The repository used to load the project.
    project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
    /// Creates a new `Usecase`.
    ///
    /// # Arguments
    ///
    /// * `event_publisher` - The event publisher used to publish events when a repository is unlinked from a project.
    /// * `project_repository` - The repository used to load the project.
    pub fn new(
        event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
        project_repository: AggregateRootRepository<Project>,
    ) -> Self {
        Self {
            event_publisher,
            project_repository,
        }
    }

    /// Unlinks a GitHub repository from a project and publishes `Event`s for the operation.
    ///
    /// # Arguments
    ///
    /// * `project_id` - The ID of the project to unlink the repository from.
    /// * `github_repo_id` - The ID of the repository to unlink.
    pub async fn unlink_github_repo(
        &self,
        project_id: ProjectId,
        github_repo_id: GithubRepoId,
    ) -> Result<(), DomainError> {
        let project = self.project_repository.find_by_id(&project_id)?;

        project
            .unlink_github_repo(github_repo_id)
            .map_err(|e| DomainError::InvalidInputs(e.into()))?
            .into_iter()
            .map(Event::from)
            .map(UniqueMessage::new)
            .collect::<Vec<_>>()
            .publish(self.event_publisher.clone())
            .await?;

        Ok(())
    }
}