/// This module provides a GithubRepoIndexRepository implementation for the Client struct
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};

use domain::GithubRepoId;
use infrastructure::database::{schema::github_repo_indexes::dsl, Client};

use crate::domain::{GithubRepoIndexRepository, RepositoryResult};

impl GithubRepoIndexRepository for Client {
    /// Inserts a Github repo index record into the database
    ///
    /// # Arguments
    ///
    /// * `repo_id` - A GithubRepoId struct representing the ID of the repo to insert
    ///
    /// # Returns
    ///
    /// A Result containing () if the operation was successful, or an error if it was not
    fn try_insert(&self, repo_id: &GithubRepoId) -> RepositoryResult<()> {
        let connection = self.connection()?;
        diesel::insert_into(dsl::github_repo_indexes)
            .values(dsl::repo_id.eq(repo_id))
            .on_conflict_do_nothing()
            .execute(&*connection)?;
        Ok(())
    }

    /// Deletes a Github repo index record from the database
    ///
    /// # Arguments
    ///
    /// * `repo_id` - A GithubRepoId struct representing the ID of the repo to delete
    ///
    /// # Returns
    ///
    /// A Result containing () if the operation was successful, or an error if it was not
    fn delete(&self, repo_id: &GithubRepoId) -> RepositoryResult<()> {
        let connection = self.connection()?;
        diesel::delete(dsl::github_repo_indexes)
            .filter(dsl::repo_id.eq(repo_id))
            .execute(&*connection)?;
        Ok(())
    }

    /// Retrieves the indexer state for a given Github repo
    ///
    /// # Arguments
    ///
    /// * `repo_id` - A GithubRepoId struct representing the ID of the repo to retrieve the state for
    ///
    /// # Returns
    ///
    /// A Result containing an Option<serde_json::Value> representing the state, or an error if the operation was unsuccessful
    fn select_repo_indexer_state(
        &self,
        repo_id: &GithubRepoId,
    ) -> RepositoryResult<Option<serde_json::Value>> {
        let connection = self.connection()?;
        let state = dsl::github_repo_indexes
            .select(dsl::repo_indexer_state)
            .filter(dsl::repo_id.eq(repo_id))
            .first(&*connection)?;
        Ok(state)
    }

    /// Updates the indexer state for a given Github repo
    ///
    /// # Arguments
    ///
    /// * `repo_id` - A GithubRepoId struct representing the ID of the repo to update the state for
    /// * `state` - A serde_json::Value representing the new state value
    ///
    /// # Returns
    ///
    /// A Result containing () if the operation was successful, or an error if it was not
    fn update_repo_indexer_state(
        &self,
        repo_id: &GithubRepoId,
        state: serde_json::Value,
    ) -> RepositoryResult<()> {
        let connection = self.connection()?;
        diesel::update(dsl::github_repo_indexes)
            .set(dsl::repo_indexer_state.eq(state))
            .filter(dsl::repo_id.eq(repo_id))
            .execute(&*connection)?;
        Ok(())
    }

    /// Retrieves the issues indexer state for a given Github repo
    ///
    /// # Arguments
    ///
    /// * `repo_id` - A GithubRepoId struct representing the ID of the repo to retrieve the state for
    ///
    /// # Returns
    ///
    /// A Result containing an Option<serde_json::Value> representing the state, or an error if the operation was unsuccessful
    fn select_issues_indexer_state(
        &self,
        repo_id: &GithubRepoId,
    ) -> RepositoryResult<Option<serde_json::Value>> {
        let connection = self.connection()?;
        let state = dsl::github_repo_indexes
            .select(dsl::issues_indexer_state)
            .filter(dsl::repo_id.eq(repo_id))
            .first(&*connection)?;
        Ok(state)
    }

    /// Updates the issues indexer state for a given Github repo
    ///
    /// # Arguments
    ///
    /// * `repo_id` - A GithubRepoId struct representing the ID of the repo to update the state for
    /// * `state` - A serde_json::Value representing the new state value
    ///
    /// # Returns
    ///
    /// A Result containing () if the operation was successful, or an error if it was not
    fn update_issues_indexer_state(
        &self,
        repo_id: &GithubRepoId,
        state: serde_json::Value,
    ) -> RepositoryResult<()> {
        let connection = self.connection()?;
        diesel::update(dsl::github_repo_indexes)
            .set(dsl::issues_indexer_state.eq(state))
            .filter(dsl::repo_id.eq(repo_id))
            .execute(&*connection)?;
        Ok(())
    }
}