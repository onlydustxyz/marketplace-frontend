/// Usecase for linking a GitHub repository with a project
pub struct Usecase {
    /// An event publisher that publishes project events
    event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
    /// An aggregate root repository for storing and retrieving projects
    project_repository: AggregateRootRepository<Project>,
    /// A service for checking if a GitHub repository exists
    github_repo_exists: Arc<dyn GithubRepoExists>,
}

impl Usecase {
    /// Creates a new instance of Usecase
    ///
    /// # Arguments
    ///
    /// * `event_publisher` - An event publisher that publishes project events
    /// * `project_repository` - An aggregate root repository for storing and retrieving projects
    /// * `github_repo_exists` - A service for checking if a GitHub repository exists
    pub fn new(
        event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
        project_repository: AggregateRootRepository<Project>,
        github_repo_exists: Arc<dyn GithubRepoExists>,
    ) -> Self {
        Self {
            event_publisher,
            project_repository,
            github_repo_exists,
        }
    }

    /// Links a project with a GitHub repository
    ///
    /// # Arguments
    ///
    /// * `project_id` - A project ID
    /// * `github_repo_id` - A GitHub repository ID
    ///
    /// # Errors
    ///
    /// Returns an error if the GitHub repository does not exist or if linking the project with the
    /// GitHub repository fails.
    #[allow(clippy::too_many_arguments)]
    #[instrument(skip(self))]
    pub async fn link_github_repo(
        &self,
        project_id: ProjectId,
        github_repo_id: GithubRepoId,
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

        let project = self.project_repository.find_by_id(&project_id)?;

        project
            .link_github_repo(github_repo_id)
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