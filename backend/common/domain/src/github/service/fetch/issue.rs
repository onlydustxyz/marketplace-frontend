/// This trait defines the operations that can be performed on a Github issue.
#[async_trait]
pub trait Service: Send + Sync {
    /// Fetches the Github issue with the specified number from the repo with the specified owner and name.
    ///
    /// # Arguments
    ///
    /// * `repo_owner` - The owner of the repo.
    /// * `repo_name` - The name of the repo.
    /// * `issue_number` - The number of the issue to fetch.
    ///
    /// # Returns
    ///
    /// A `Result` containing the fetched `GithubIssue` if successful, or an error if unsuccessful.
	async fn issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> Result<GithubIssue>;

    /// Fetches the Github issue with the specified number from the repo with the specified ID.
    ///
    /// # Arguments
    ///
    /// * `repo_id` - The ID of the repo.
    /// * `issue_number` - The number of the issue to fetch.
    ///
    /// # Returns
    ///
    /// A `Result` containing the fetched `GithubIssue` if successful, or an error if unsuccessful.
	async fn issue_by_repo_id(
		&self,
		repo_id: &GithubRepoId,
		issue_number: &GithubIssueNumber,
	) -> Result<GithubIssue>;

    /// Fetches a list of Github issues for a repo with the specified ID and filter criteria.
    ///
    /// # Arguments
    ///
    /// * `repo_id` - The ID of the repo to fetch issues for.
    /// * `filters` - The filter criteria for the issues to fetch.
    ///
    /// # Returns
    ///
    /// A `Result` containing a vector of fetched `GithubIssue`s if successful, or an error if unsuccessful.
	async fn issues_by_repo_id(
		&self,
		repo_id: &GithubRepoId,
		filters: &GithubServiceIssueFilters,
	) -> Result<Vec<GithubIssue>>;
}