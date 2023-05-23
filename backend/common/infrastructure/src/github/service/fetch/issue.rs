//! Defines a Github Fetch Issue Service implementation using the Github API via the `octocrab` crate.
//!
//! This module implements the `GithubFetchIssueService` trait from the `domain` module, providing
//! async methods for fetching Github Issues, by repository ID and issue number, as well as filtering by additional parameters.
//!
//! # Examples
//!
//! ```
//! use octocrab::OctocrabBuilder;
//! use github_middleware::{GithubFetchIssueService, GithubServiceIssueFilters};
//!
//! #[tokio::main]
//! async fn main() -> Result<(), Box<dyn std::error::Error>> {
//!     let octocrab = OctocrabBuilder::new().personal_token("MY_TOKEN").build()?;
//!     let client = github_middleware::Client::new(octocrab);
//!
//!     let filters = GithubServiceIssueFilters::builder().state("open").build()?;
//!     let issues = client
//!         .issues_by_repo_id(&1234, &filters)
//!         .await
//!         .expect("Failed to fetch issues");
//!
//!     Ok(())
//! }
//! ```
use async_trait::async_trait;
use domain::{
    GithubFetchIssueService, GithubIssue, GithubIssueNumber, GithubRepoId, GithubServiceError,
    GithubServiceIssueFilters, GithubServiceResult,
};
use olog::tracing::instrument;

use crate::{github, github::IssueFromOctocrab};

#[async_trait]
impl GithubFetchIssueService for github::Client {
    /// Fetches issues for a specified repository ID and returns a vector of `GithubIssue`.
    ///
    /// # Arguments
    ///
    /// * `repo_id` - A reference to a `GithubRepoId` representing the repository ID.
    /// * `filters` - A reference to a `GithubServiceIssueFilters` struct representing additional filters to apply.
    ///
    /// # Returns
    ///
    /// A `GithubServiceResult` containing a vector of `GithubIssue`s, or a `GithubServiceError` if an error occurs.
    ///
    /// # Examples
    ///
    /// ```
    /// use octocrab::OctocrabBuilder;
    /// use github_middleware::{GithubFetchIssueService, GithubServiceIssueFilters};
    ///
    /// #[tokio::main]
    /// async fn main() -> Result<(), Box<dyn std::error::Error>> {
    ///     let octocrab = OctocrabBuilder::new().personal_token("MY_TOKEN").build()?;
    ///     let client = github_middleware::Client::new(octocrab);
    ///
    ///     let filters = GithubServiceIssueFilters::builder().state("open").build()?;
    ///     let issues = client
    ///         .issues_by_repo_id(&1234, &filters)
    ///         .await
    ///         .expect("Failed to fetch issues");
    ///
    ///     Ok(())
    /// }
    /// ```
    #[instrument(skip(self))]
    async fn issues_by_repo_id(
        &self,
        repo_id: &GithubRepoId,
        filters: &GithubServiceIssueFilters,
    ) -> GithubServiceResult<Vec<GithubIssue>> {
        let issues = self.issues_by_repo_id(repo_id, filters).await?;
        Ok(issues)
    }

    /// Fetches a single issue by its repository owner, repository name, and issue number, and returns a `GithubIssue`.
    ///
    /// # Arguments
    ///
    /// * `repo_owner` - A string slice representing the repository owner's GitHub username or organization.
    /// * `repo_name` - A string slice representing the repository name.
    /// * `issue_number` - A reference to a `GithubIssueNumber` representing the issue number.
    ///
    /// # Returns
    ///
    /// A `GithubServiceResult` containing a `GithubIssue`, or a `GithubServiceError` if an error occurs.
    ///
    /// # Examples
    ///
    /// ```
    /// use octocrab::OctocrabBuilder;
    /// use github_middleware::{GithubFetchIssueService, GithubServiceIssueFilters};
    ///
    /// #[tokio::main]
    /// async fn main() -> Result<(), Box<dyn std::error::Error>> {
    ///     let octocrab = OctocrabBuilder::new().personal_token("MY_TOKEN").build()?;
    ///     let client = github_middleware::Client::new(octocrab);
    ///
    ///     let issue_number = GithubIssueNumber::new(1234)?;
    ///     let issue = client
    ///         .issue("my_username", "my_repo", &issue_number)
    ///         .await?;
    ///
    ///     Ok(())
    /// }
    /// ```
    #[instrument(skip(self))]
    async fn issue(
        &self,
        repo_owner: &str,
        repo_name: &str,
        issue_number: &GithubIssueNumber,
    ) -> GithubServiceResult<GithubIssue> {
        let issue = self.get_issue(repo_owner, repo_name, issue_number).await?;
        let repo_id = self.get_issue_repository_id(&issue).await?;
        GithubIssue::from_octocrab_issue(issue, repo_id).map_err(GithubServiceError::Other)
    }

    /// Fetches a single issue by its repository ID and issue number, and returns a `GithubIssue`.
    ///
    /// # Arguments
    ///
    /// * `repo_id` - A reference to a `GithubRepoId` representing the repository ID.
    /// * `issue_number` - A reference to a `GithubIssueNumber` representing the issue number.
    ///
    /// # Returns
    ///
    /// A `GithubServiceResult` containing a `GithubIssue`, or a `GithubServiceError` if an error occurs.
    ///
    /// # Examples
    ///
    /// ```
    /// use octocrab::OctocrabBuilder;
    /// use github_middleware::{GithubFetchIssueService, GithubServiceIssueFilters};
    ///
    /// #[tokio::main]
    /// async fn main() -> Result<(), Box<dyn std::error::Error>> {
    ///     let octocrab = OctocrabBuilder::new().personal_token("MY_TOKEN").build()?;
    ///     let client = github_middleware::Client::new(octocrab);
    ///
    ///     let repo_id = GithubRepoId::new(1234)?;
    ///     let issue_number = GithubIssueNumber::new(5678)?;
    ///     let issue = client
    ///         .issue_by_repo_id(&repo_id, &issue_number)
    ///         .await?;
    ///
    ///     Ok(())
    /// }
    /// ```
    #[instrument(skip(self))]
    async fn issue_by_repo_id(
        &self,
        repo_id: &GithubRepoId,
        issue_number: &GithubIssueNumber,
    ) -> GithubServiceResult<GithubIssue> {
        let issue = self.get_issue_by_repository_id(repo_id, issue_number).await?;
        GithubIssue::from_octocrab_issue(issue, *repo_id).map_err(GithubServiceError::Other)
    }
}