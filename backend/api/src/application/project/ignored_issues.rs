use anyhow::Result;
use derive_more::Constructor;
use domain::{DomainError, GithubIssueNumber, GithubRepoId, ProjectId};
use tracing::instrument;

use crate::infrastructure::database::IgnoredGithubIssuesRepository;

/// The `Usecase` struct provides methods to add and remove ignored Github issues to/from the
/// database.
#[derive(Constructor)]
pub struct Usecase {
    ignored_github_issues_repository: IgnoredGithubIssuesRepository,
}

impl Usecase {
    /// Adds the given Github issue to the list of ignored issues in the database for the given
    /// project and repository.
    ///
    /// # Arguments
    ///
    /// * `project_id` - The ID of the project the issue belongs to.
    /// * `repo_id` - The ID of the Github repository the issue belongs to.
    /// * `issue_number` - The number of the Github issue to be ignored.
    ///
    /// # Returns
    ///
    /// This method returns `Result<(), DomainError>`.
    ///
    /// # Example
    ///
    /// ```
    /// # use domain::{ProjectId, GithubRepoId, GithubIssueNumber};
    /// # use tracing::Level;
    /// # use mockall::predicate::*;
    /// # use mockall::*;
    /// # use crate::infrastructure::database::*;
    /// # use super::*;
    /// # let project_id = ProjectId::new();
    /// # let repo_id = GithubRepoId::new("test/test").unwrap();
    /// # let issue_number = GithubIssueNumber::new(1).unwrap();
    /// # let ignored_github_issues_repository = MockIgnoredGithubIssuesRepository::new();
    /// # let usecase = Usecase::new(ignored_github_issues_repository);
    /// # let ctx = MockedContext;
    /// # let span = ctx.enter_span("testing");
    /// # let _guard = span.enter();
    /// # ignored_github_issues_repository
    /// #     .expect_try_insert()
    /// #     .with(eq(project_id), eq(repo_id), eq(issue_number))
    /// #     .returning(|_, _, _| Ok(()));
    /// use tracing_subscriber::FmtSubscriber;
    ///
    /// let subscriber = FmtSubscriber::builder()
    ///     .with_max_level(Level::INFO)
    ///     .finish();
    ///
    /// tracing::subscriber::set_global_default(subscriber).unwrap();
    ///
    /// let result = usecase.add(&project_id, &repo_id, &issue_number);
    ///
    /// assert!(result.is_ok());
    /// ```
    #[instrument(skip(self))]
    pub fn add(
        &self,
        project_id: &ProjectId,
        repo_id: &GithubRepoId,
        issue_number: &GithubIssueNumber,
    ) -> Result<(), DomainError> {
        self.ignored_github_issues_repository
            .try_insert(project_id, repo_id, issue_number)?;
        Ok(())
    }

    /// Removes the given Github issue from the list of ignored issues in the database for the given
    /// project and repository.
    ///
    /// # Arguments
    ///
    /// * `project_id` - The ID of the project the issue belongs to.
    /// * `repo_id` - The ID of the Github repository the issue belongs to.
    /// * `issue_number` - The number of the Github issue to be removed from the list of ignored
    /// issues.
    ///
    /// # Returns
    ///
    /// This method returns `Result<(), DomainError>`.
    ///
    /// # Example
    ///
    /// ```
    /// # use domain::{ProjectId, GithubRepoId, GithubIssueNumber};
    /// # use tracing::Level;
    /// # use mockall::predicate::*;
    /// # use mockall::*;
    /// # use crate::infrastructure::database::*;
    /// # use super::*;
    /// # let project_id = ProjectId::new();
    /// # let repo_id = GithubRepoId::new("test/test").unwrap();
    /// # let issue_number = GithubIssueNumber::new(1).unwrap();
    /// # let ignored_github_issues_repository = MockIgnoredGithubIssuesRepository::new();
    /// # let usecase = Usecase::new(ignored_github_issues_repository);
    /// # let ctx = MockedContext;
    /// # let span = ctx.enter_span("testing");
    /// # let _guard = span.enter();
    /// # ignored_github_issues_repository
    /// #     .expect_delete()
    /// #     .with(eq(project_id), eq(repo_id), eq(issue_number))
    /// #     .returning(|_, _, _| Ok(()));
    /// use tracing_subscriber::FmtSubscriber;
    ///
    /// let subscriber = FmtSubscriber::builder()
    ///     .with_max_level(Level::INFO)
    ///     .finish();
    ///
    /// tracing::subscriber::set_global_default(subscriber).unwrap();
    ///
    /// let result = usecase.remove(&project_id, &repo_id, &issue_number);
    ///
    /// assert!(result.is_ok());
    /// ```
    #[instrument(skip(self))]
    pub fn remove(
        &self,
        project_id: &ProjectId,
        repo_id: &GithubRepoId,
        issue_number: &GithubIssueNumber,
    ) -> Result<(), DomainError> {
        self.ignored_github_issues_repository
            .delete(project_id, repo_id, issue_number)?;
        Ok(())
    }
}