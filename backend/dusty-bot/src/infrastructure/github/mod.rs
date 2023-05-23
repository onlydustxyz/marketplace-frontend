/// Implementation of `GithubService` trait for `github::Client`.
use async_trait::async_trait;
use domain::{
    GithubFetchIssueService, GithubFetchRepoService, GithubFetchUserService, GithubIssue,
    GithubIssueNumber, GithubIssueStatus, GithubRepoId, GithubServiceError, GithubServiceResult,
};
use infrastructure::github::{self, IssueFromOctocrab};
use octocrab::{self, models};
use olog::tracing::instrument;

/// Async implementation of GithubService for interacting with the Github API.
#[async_trait]
impl GithubService for github::Client {
    /// Attempts to create a new issue for a repository with `repo_id`.
    ///
    /// The issue's `title` and `description` are set to the provided values.
    ///
    /// # Errors
    ///
    /// Returns a `GithubServiceError` if `repo_id` does not correspond to a valid repository,
    /// or if the API request to create a new issue fails.
    ///
    /// # Examples
    ///
    /// ```ignore
    /// let client = github::Client::new(token);
    /// let repo_id = GithubRepoId::new("octocat", "Hello-World").unwrap();
    ///
    /// match client.create_issue(&repo_id, "Issue Title", "Issue Description").await {
    ///     Ok(created_issue) => println!("Created issue: {:?}", created_issue),
    ///     Err(error) => println!("Error creating issue: {:?}", error),
    /// }
    /// ```
    #[instrument(skip(self))]
    async fn create_issue(
        &self,
        repo_id: &GithubRepoId,
        title: &str,
        description: &str,
    ) -> GithubServiceResult<GithubIssue> {
        let repo = self.repo_by_id(repo_id).await?;

        let issue = self
            .octocrab()
            .issues(repo.owner(), repo.name())
            .create(title)
            .body(description)
            .send()
            .await
            .map_err(github::Error::from)?;

        GithubIssue::from_octocrab_issue(issue, *repo.id()).map_err(GithubServiceError::Other)
    }

    /// Attempts to close an existing issue in the specified repository.
    ///
    /// The issue to be closed is identified by its `repo_owner`, `repo_name`, and `issue_number`.
    ///
    /// Only issues that are open and were authored by the current user can be closed with this method.
    ///
    /// # Errors
    ///
    /// Returns a `GithubServiceError` if the issue cannot be found, if it is not open, if it
    /// was not authored by the current user, or if the API request to close the issue fails.
    ///
    /// # Examples
    ///
    /// ```ignore
    /// let client = github::Client::new(token);
    /// let repo_owner = "octocat";
    /// let repo_name = "Hello-World";
    /// let issue_number = GithubIssueNumber::new(1).unwrap();
    ///
    /// match client.close_issue(repo_owner, repo_name, &issue_number).await {
    ///     Ok(_) => println!("Closed issue #{:?} in {} repository", issue_number, repo_name),
    ///     Err(error) => println!("Error closing issue: {:?}", error),
    /// }
    /// ```
    async fn close_issue(
        &self,
        repo_owner: &str,
        repo_name: &str,
        issue_number: &GithubIssueNumber,
    ) -> GithubServiceResult<()> {
        let dusty_bot = self.current_user().await?;

        let issue = self.issue(repo_owner, repo_name, issue_number).await?;
        let issue_number: u64 = (*issue_number).into();

        if issue.author.id() == dusty_bot.id() && issue.status == GithubIssueStatus::Open {
            self.octocrab()
                .issues(repo_owner, repo_name)
                .update(issue_number)
                .state(models::IssueState::Closed)
                .send()
                .await
                .map_err(github::Error::from)?;
        }
        Ok(())
    }
}