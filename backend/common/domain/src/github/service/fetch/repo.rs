/// This module provides a trait and related structures for interacting with the GitHub API.
use std::sync::Arc;

use async_trait::async_trait;

#[cfg(test)]
use mockall::automock;

use super::Result;
use crate::{stream_filter, GithubRepo, GithubRepoId, GithubRepoLanguages, GithubUser};

/// The Service trait provides methods to interact with the GitHub API.
#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
    /// Retrieve a GitHub repository by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - ID of the repository to retrieve.
    ///
    /// # Returns
    ///
    /// * `GithubRepo` - A struct representing GitHub repository.
    async fn repo_by_id(&self, id: &GithubRepoId) -> Result<GithubRepo>;

    /// Retrieve the languages used in a GitHub repository.
    ///
    /// # Arguments
    ///
    /// * `id` - ID of the repository to retrieve languages for.
    ///
    /// # Returns
    ///
    /// * `GithubRepoLanguages` - A struct representing languages used in the GitHub repository.
    async fn repo_languages(&self, id: &GithubRepoId) -> Result<GithubRepoLanguages>;

    /// Retrieve the contributors for a GitHub repository using the provided filters.
    ///
    /// # Arguments
    ///
    /// * `repo_id` - ID of the repository to retrieve contributors for.
    /// * `filters` - Filters to apply to the stream of contributors.
    ///
    /// # Returns
    ///
    /// * `Vec<GithubUser>` - A vector of structs representing contributors to the GitHub repository.
    async fn repo_contributors(
        &self,
        repo_id: &GithubRepoId,
        filters: Arc<dyn stream_filter::Filter<I = GithubUser>>,
    ) -> Result<Vec<GithubUser>>;
}