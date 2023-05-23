use std::sync::Arc;

use derive_more::Constructor;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};

use domain::{GithubIssueNumber, GithubRepoId, ProjectId};
use infrastructure::database::{schema::ignored_github_issues::dsl, Client, DatabaseError};

/// Repository struct provides methods to access and modify ignored_github_issues in the database.
#[derive(Constructor, Clone)]
pub struct Repository(Arc<Client>);

impl Repository {
    /// Insert a new `ignored_github_issue` record in the database, ignoring if it already exists.
    ///
    /// # Arguments
    ///
    /// * `project_id` - The ID of the project.
    /// * `repo_id` - The ID of the Github repository.
    /// * `issue_number` - The number of the Github issue.
    ///
    /// # Errors
    ///
    /// Returns a `DatabaseError` if the operation fails.
    ///
    /// # Example
    ///
    /// ```ignore
    /// let repo = Repository::new(client);
    /// let result = repo.try_insert(&project_id, &repo_id, &issue_number);
    /// ```
    #[tracing::instrument(name = "ignored_github_issues::insert", skip(self))]
    pub fn try_insert(
        &self,
        project_id: &ProjectId,
        repo_id: &GithubRepoId,
        issue_number: &GithubIssueNumber,
    ) -> Result<(), DatabaseError> {
        let connection = self.0.connection()?;
        diesel::insert_into(dsl::ignored_github_issues)
            .values((
                dsl::project_id.eq(project_id),
                dsl::repo_id.eq(repo_id),
                dsl::issue_number.eq(issue_number),
            ))
            .on_conflict_do_nothing()
            .execute(&*connection)?;
        Ok(())
    }

    /// Delete an existing `ignored_github_issue` record from the database.
    ///
    /// # Arguments
    ///
    /// * `project_id` - The ID of the project.
    /// * `repo_id` - The ID of the Github repository.
    /// * `issue_number` - The number of the Github issue.
    ///
    /// # Errors
    ///
    /// Returns a `DatabaseError` if the operation fails.
    ///
    /// # Example
    ///
    /// ```ignore
    /// let repo = Repository::new(client);
    /// let result = repo.delete(&project_id, &repo_id, &issue_number);
    /// ```
    #[tracing::instrument(name = "ignored_github_issues::delete", skip(self))]
    pub fn delete(
        &self,
        project_id: &ProjectId,
        repo_id: &GithubRepoId,
        issue_number: &GithubIssueNumber,
    ) -> Result<(), DatabaseError> {
        let connection = self.0.connection()?;
        diesel::delete(
            dsl::ignored_github_issues
                .filter(dsl::project_id.eq(project_id))
                .filter(dsl::repo_id.eq(repo_id))
                .filter(dsl::issue_number.eq(issue_number)),
        )
        .execute(&*connection)?;
        Ok(())
    }
}