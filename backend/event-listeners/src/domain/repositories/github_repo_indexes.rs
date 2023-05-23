/// This module contains a trait named Repository that defines the
/// interface for interacting with a storage backend to manage data on
/// Github repositories.
///
/// The `Repository` trait is implemented by various storage backends 
/// (e.g. SQLite, PostgreSQL, etc.). Its methods provide a way to 
/// interact with and manage data on saved Github repositories.
///
/// # Examples
///
/// ```
/// use domain::GithubRepoId;
/// use super::Repository;
///
/// pub trait Repository: Send + Sync {
///   fn try_insert(&self, repo_id: &GithubRepoId) -> Result<()>;
///
///   fn delete(&self, repo_id: &GithubRepoId) -> Result<()>;
///
///   fn select_repo_indexer_state(&self, repo_id: &GithubRepoId) -> Result<Option<serde_json::Value>>;
///
///   fn update_repo_indexer_state(&self, repo_id: &GithubRepoId, state: serde_json::Value) -> Result<()>;
///
///   fn select_issues_indexer_state(&self, repo_id: &GithubRepoId) -> Result<Option<serde_json::Value>>;
///
///   fn update_issues_indexer_state(&self, repo_id: &GithubRepoId, state: serde_json::Value) -> Result<()>;
/// }
/// ```
use domain::GithubRepoId;
use super::Result;

pub trait Repository: Send + Sync {
	fn try_insert(&self, repo_id: &GithubRepoId) -> Result<()>;

	/// Delete a repository from the storage backend
	///
	/// # Arguments
	///
	/// * `repo_id` - A reference to a `GithubRepoId` object representing the ID
	///               of the repository to be deleted
	///
	/// # Return
	///
	/// This method returns a `Result<()>`. Any error that occurs during
	/// the deletion process will be returned as an `Err` variant.
	fn delete(&self, repo_id: &GithubRepoId) -> Result<()>;

	/// Select the indexer state of a repository in the storage backend
	///
	/// # Arguments
	///
	/// * `repo_id` - A reference to a `GithubRepoId` object representing the ID
	///               of the repository whose indexer state is to be selected
	///
	/// # Return
	///
	/// This method returns a `Result<Option<serde_json::Value>>`. The value that is
	/// returned is an Option because the indexer state may or may not have been set.
	/// If the state is present, it is returned as a `Some` variant. If the state is not
	/// present, `None` is returned. If an error occurs, it is returned as an `Err` variant.
	fn select_repo_indexer_state(&self, repo_id: &GithubRepoId) -> Result<Option<serde_json::Value>>;

	/// Update the indexer state of a repository in the storage backend
	///
	/// # Arguments
	///
	/// * `repo_id` - A reference to a `GithubRepoId` object representing the ID
	///               of the repository whose indexer state is to be updated
	/// * `state`   - A `serde_json::Value` object representing the indexer state
	///               to set for the repository
	///
	/// # Return
	///
	/// This method returns a `Result<()>`. Any error that occurs during
	/// the update process will be returned as an `Err` variant.
	fn update_repo_indexer_state(&self, repo_id: &GithubRepoId, state: serde_json::Value) -> Result<()>;

	/// Select the indexer state of a repository's issues in the storage backend
	///
	/// # Arguments
	///
	/// * `repo_id` - A reference to a `GithubRepoId` object representing the ID
	///               of the repository whose issues indexer state is to be selected
	///
	/// # Return
	///
	/// This method returns a `Result<Option<serde_json::Value>>`. The value that is
	/// returned is an Option because the indexer state may or may not have been set.
	/// If the state is present, it is returned as a `Some` variant. If the state is not
	/// present, `None` is returned. If an error occurs, it is returned as an `Err` variant.
	fn select_issues_indexer_state(&self, repo_id: &GithubRepoId) -> Result<Option<serde_json::Value>>;

	/// Update the indexer state of a repository's issues in the storage backend
	///
	/// # Arguments
	///
	/// * `repo_id` - A reference to a `GithubRepoId` object representing the ID
	///               of the repository whose issues indexer state is to be updated
	/// * `state`   - A `serde_json::Value` object representing the issues indexer state
	///               to set for the repository
	///
	/// # Return
	///
	/// This method returns a `Result<()>`. Any error that occurs during
	/// the update process will be returned as an `Err` variant.
	fn update_issues_indexer_state(&self, repo_id: &GithubRepoId, state: serde_json::Value) -> Result<()>;
}