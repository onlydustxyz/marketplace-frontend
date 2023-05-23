/// This module provides a repository implementation for managing Github user indexes.
use diesel::{ExpressionMethods, OptionalExtension, QueryDsl, RunQueryDsl};
use domain::GithubUserId;
use infrastructure::database::{schema::github_user_indexes::dsl, Client};

use crate::domain::{GithubUserIndexRepository, RepositoryResult};

impl GithubUserIndexRepository for Client {
    /// Inserts a Github user index into the database.
    ///
    /// # Arguments
    ///
    /// * `user_id` - The Github user ID.
    ///
    /// # Returns
    ///
    /// * `Ok(())` if the operation was successful, otherwise a `RepositoryResult` error.
    fn try_insert(&self, user_id: &GithubUserId) -> RepositoryResult<()> {
        let connection = self.connection()?;
        diesel::insert_into(dsl::github_user_indexes)
            .values((dsl::user_id.eq(user_id),))
            .on_conflict_do_nothing()
            .execute(&*connection)?;
        Ok(())
    }

    /// Selects the state of the Github user indexer for a specific user from the database.
    ///
    /// # Arguments
    ///
    /// * `user_id` - The Github user ID.
    ///
    /// # Returns
    ///
    /// * `Ok(Some(state))` if the state exists, otherwise `Ok(None)`.
    /// * A `RepositoryResult` error if the operation was unsuccessful.
    fn select_user_indexer_state(
        &self,
        user_id: &GithubUserId,
    ) -> RepositoryResult<Option<serde_json::Value>> {
        let connection = self.connection()?;
        let state = dsl::github_user_indexes
            .select(dsl::user_indexer_state)
            .filter(dsl::user_id.eq(user_id))
            .first(&*connection)
            .optional()?
            .flatten();
        Ok(state)
    }

    /// Inserts or updates the state of the Github user indexer for a specific user in the database.
    ///
    /// # Arguments
    ///
    /// * `user_id` - The Github user ID.
    /// * `state` - The state of the Github user indexer.
    ///
    /// # Returns
    ///
    /// * `Ok(())` if the operation was successful, otherwise a `RepositoryResult` error.
    fn upsert_user_indexer_state(
        &self,
        user_id: &GithubUserId,
        state: serde_json::Value,
    ) -> RepositoryResult<()> {
        let connection = self.connection()?;
        diesel::insert_into(dsl::github_user_indexes)
            .values((
                dsl::user_id.eq(user_id),
                dsl::user_indexer_state.eq(state.clone()),
            ))
            .on_conflict(dsl::user_id)
            .do_update()
            .set(dsl::user_indexer_state.eq(state))
            .execute(&*connection)?;
        Ok(())
    }
}