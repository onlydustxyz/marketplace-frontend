/**
* This module provides functionality to index Github users and contributors by user ID and repo ID respectively.
* It defines a struct `Indexer` containing methods to index, store and update state of users and contributors while 
* implementing the `Indexer` and `Stateful` traits. It also contains a `State` struct and `UserHashFilter` struct used 
* by the `Indexer` struct for indexing users and contributors.
* 
* # Examples
* ```
* use async_trait::async_trait;
* use derive_new::new;
* use domain::{stream_filter, GithubFetchService, GithubRepoId, GithubUser, GithubUserId, LogErr};
* use event_listeners::domain::{GithubEvent, GithubUserIndexRepository};
* use std::{collections::HashSet, sync::Arc};
* use serde::{Deserialize, Serialize};
* use stream_filter::Decision;
* use super::{hash, IgnoreIndexerErrors, Result};
* 
* #[derive(Default, Clone, Serialize, Deserialize, PartialEq, Eq)]
* struct State {
*    pub hash: u64,
*    pub repo_ids: HashSet<GithubRepoId>,
* }
*
* impl State {
*    fn json(&self) -> serde_json::Result<serde_json::Value> {
*        serde_json::to_value(self)
*    }
*
*    fn get(
*        github_user_index_repository: &dyn GithubUserIndexRepository,
*        user_id: &GithubUserId,
*    ) -> anyhow::Result<Option<State>> {
*        let state = match github_user_index_repository.select_user_indexer_state(user_id)? {
*            Some(state) => {
*                let state = serde_json::from_value(state)?;
*                Some(state)
*            },
*            _ => None,
*        };
*        Ok(state)
*    }
*
*    fn matches(&self, user: &GithubUser, repo_id: &GithubRepoId) -> bool {
*        self.hash == hash(user) && self.repo_ids.contains(repo_id)
*    }
*
*    fn with(mut self, user: &GithubUser, repo_id: Option<GithubRepoId>) -> Self {
*        if let Some(repo_id) = repo_id {
*            self.repo_ids.insert(repo_id);
*        }
*        Self {
*            hash: hash(user),
*            ..self
*        }
*    }
*}
*
* /// This is the indexer struct with implementation for the traits `Indexer` and `Stateful`
* #[derive(new)]
* pub struct Indexer {
*    github_fetch_service: Arc<dyn GithubFetchService>,
*    github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
* }
* 
* #[async_trait]
* impl super::Indexer<GithubUserId> for Indexer {
*    async fn index(&self, user_id: GithubUserId) -> Result<Vec<GithubEvent>> {
*        let events = self
*            .github_fetch_service
*            .user_by_id(&user_id)
*            .await
*            .map(|user| {
*                vec![GithubEvent::User {
*                    user,
*                    repo_id: None,
*                }]
*            })
*            .ignore_non_fatal_errors()?;
*        Ok(events)
*    }
* }
* 
* impl super::Stateful<GithubUserId> for Indexer {
*    fn store(&self, _: GithubUserId, events: &[GithubEvent]) -> anyhow::Result<()> {
*        if let Some(GithubEvent::User { user, .. }) = events.last() {
*            self.update_state_with(user, None)?;
*        }
*        Ok(())
*    }
* }
* 
* #[async_trait]
* impl super::Indexer<GithubRepoId> for Indexer {
*    async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
*        let user_hash_filter = Arc::new(UserHashFilter::new(
*            self.github_user_index_repository.clone(),
*            repo_id,
*        ));
*
*        let events = self
*            .github_fetch_service
*            .repo_contributors(&repo_id, user_hash_filter)
*            .await
*            .ignore_non_fatal_errors()?
*            .into_iter()
*            .map(|user| GithubEvent::User {
*                user,
*                repo_id: Some(repo_id),
*            })
*            .collect();
*
*        Ok(events)
*    }
* }
* 
* impl super::Stateful<GithubRepoId> for Indexer {
*    fn store(&self, repo_id: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
*        events
*            .iter()
*            .filter_map(|event| match event {
*                GithubEvent::User { user, .. } => Some(user),
*                _ => None,
*            })
*            .try_for_each(|user| self.update_state_with(user, Some(repo_id)))?;
*        Ok(())
*    }
* }
* 
* #[derive(new)]
* struct UserHashFilter {
*    github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
*    repo_id: GithubRepoId,
* }
*
* impl stream_filter::Filter for UserHashFilter {
*    type I = GithubUser;
*    fn filter(&self, user: GithubUser) -> Decision<GithubUser> {
*        match State::get(self.github_user_index_repository.as_ref(), user.id())
*            .log_err("Failed to retrieve contributors indexer state")
*        {
*            Ok(Some(state)) if state.matches(&user, &self.repo_id) => Decision::Skip,
*            _ => Decision::Take(user),
*        }
*    }
* }
*
*/ 
use std::{collections::HashSet, sync::Arc};
use async_trait::async_trait;
use derive_new::new;
use domain::{stream_filter, GithubFetchService, GithubRepoId, GithubUser, GithubUserId, LogErr};
use event_listeners::domain::{GithubEvent, GithubUserIndexRepository};
use serde::{Deserialize, Serialize};
use stream_filter::Decision;
use super::{hash, IgnoreIndexerErrors, Result};

/** `State` struct stores the hash and repository IDs of the indexed Github user or user contributors 
 * 
 *  # Fields
 * `hash`: `u64` - represents the hash of the indexed Github user
 * `repo_ids`: `HashSet<GithubRepoId>` - stores the repository IDs of the user or user contributors
 * 
 *  This struct implements `Default`, `Clone`, `Serialize` and `Deserialize` traits and methods to 
 *  return a JSON value representing the state and to get a state from the repository.
 */
#[derive(Default, Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
    pub hash: u64,
    pub repo_ids: HashSet<GithubRepoId>,
}

impl State {
    /// Returns a JSON value representing the state
    pub fn json(&self) -> serde_json::Result<serde_json::Value> {
        serde_json::to_value(self)
    }

    /** Method to retrieve a user or user contributor's state from the repository
     *  # Arguments
     *  * `github_user_index_repository`: `&dyn GithubUserIndexRepository` - a reference to a trait object representing a Github user index repository
     *  * `user_id`: `&GithubUserId` - reference to the indexed Github user's ID
     *  
     *  # Returns
     *  `anyhow::Result<Option<State>>` - A result object containing either the retrieved state if it exists 
     *  or a `None` instance if it does not.
     */
    fn get(
        github_user_index_repository: &dyn GithubUserIndexRepository,
        user_id: &GithubUserId,
    ) -> anyhow::Result<Option<State>> {
        let state = match github_user_index_repository.select_user_indexer_state(user_id)? {
            Some(state) => {
                let state = serde_json::from_value(state)?;
                Some(state)
            },
            _ => None,
        };
        Ok(state)
    }

    /** Method to check if a given Github user or user contributor matches to a particular repository based on the user's hash and repo IDs
     * # Arguments
     * * `self`: `&Self` - reference to the `State` object
     * * `user`: `&GithubUser` - reference to the user or user contributor being matched
     * * `repo_id`: `&GithubRepoId` - reference to the repository ID
     * 
     * # Returns
     * `bool` - `true` if the user matches the repository, otherwise `false`
     */
    fn matches(&self, user: &GithubUser, repo_id: &GithubRepoId) -> bool {
        self.hash == hash(user) && self.repo_ids.contains(repo_id)
    }

    /** Method to add a given Github user or user contributor and their associated repository to the state
     * # Arguments
     * * `self`: `Self` - reference to the `State` object
     * * `user`: `&GithubUser` - reference to the user or user contributor being added
     * * `repo_id`: `Option<GithubRepoId>` - An optional `GithubRepoId` parameter pointing to the repository ID to add to the state
     * 
     * # Returns  
     * `Self`: A copy of the updated `State` object
     */
    fn with(mut self, user: &GithubUser, repo_id: Option<GithubRepoId>) -> Self {
        if let Some(repo_id) = repo_id {
            self.repo_ids.insert(repo_id);
        }
        Self {
            hash: hash(user),
            ..self
        }
    }
}

/** `Indexer` struct containing methods to index, store and update state of users and contributors while 
    implementing the `Indexer` and `Stateful` traits */
#[derive(new)]
pub struct Indexer {

    github_fetch_service: Arc<dyn GithubFetchService>,
    github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
}

impl Indexer {
    /** Method to retrieve the state of a given Github user from the repository
     * # Arguments
     * * `user_id`: `&GithubUserId` - reference to the indexed Github user's ID
     * 
     * # Returns
     * `anyhow::Result<Option<State>>` - A result object containing either the state if it exists 
     * or a `None` instance if it does not.
     */
    fn get_state(&self, user_id: &GithubUserId) -> anyhow::Result<Option<State>> {
        State::get(self.github_user_index_repository.as_ref(), user_id)
    }

    /** Method to update a user or user contributor's state with a new Github user and repo ID
     * # Arguments
     * * `user`: `&GithubUser` - Reference to the Github user or user contributor
     * * `repo_id`: `Option<GithubRepoId>` - An optional `GithubRepoId` parameter pointing to a repository ID
     * 
     * # Returns
     * `anyhow::Result<()>` - Ok if update successful, otherwise an error.
     */ 
    fn update_state_with(
        &self,
        user: &GithubUser,
        repo_id: Option<GithubRepoId>,
    ) -> anyhow::Result<()> {
        let state = self.get_state(user.id())?.unwrap_or_default().with(user, repo_id);
        self.github_user_index_repository
            .upsert_user_indexer_state(user.id(), state.json()?)?;
        Ok(())
    }
}

/** Implementation of the `Indexer` trait for `Indexer` struct that indexes Github users based on user Ids.
It's an async function.
*/
#[async_trait]
impl super::Indexer<GithubUserId> for Indexer {
    async fn index(&self, user_id: GithubUserId) -> Result<Vec<GithubEvent>> {
        let events = self
            .github_fetch_service
            .user_by_id(&user_id)
            .await
            .map(|user| {
                vec![GithubEvent::User {
                    user,
                    repo_id: None,
                }]
            })
            .ignore_non_fatal_errors()?;
        Ok(events)
    }
}

/** Implementation of the `Stateful` trait for `Indexer` struct that stores a Github user's state. */
impl super::Stateful<GithubUserId> for Indexer {
    /** Method to store or update a user's state from the repository.
     * # Arguments
     * * `_: GithubUserId` - reference to the indexed Github user's ID
     * * `events`: `&[GithubEvent]` - A reference to a slice of all Github events that occurred
     * 
     * # Returns
     * `anyhow::Result<()>` - Ok if storage is successful otherwise, an error.
     */
    fn store(&self, _: GithubUserId, events: &[GithubEvent]) -> anyhow::Result<()> {
        if let Some(GithubEvent::User { user, .. }) = events.last() {
            self.update_state_with(user, None)?;
        }
        Ok(())
    }
}

/** Implementation of the `Indexer` trait for `Indexer` struct that indexes Github contributors based on repo IDs.
It's an async function.
*/
#[async_trait]
impl super::Indexer<GithubRepoId> for Indexer {
    async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
        let user_hash_filter = Arc::new(UserHashFilter::new(
            self.github_user_index_repository.clone(),
            repo_id,
        ));

        let events = self
            .github_fetch_service
            .repo_contributors(&repo_id, user_hash_filter)
            .await
            .ignore_non_fatal_errors()?
            .into_iter()
            .map(|user| GithubEvent::User {
                user,
                repo_id: Some(repo_id),
            })
            .collect();

        Ok(events)
    }
}

/** Implementation of the `Stateful` trait for `Indexer` struct that stores a Github contributor's state based on repo ID. */
impl super::Stateful<GithubRepoId> for Indexer {
    /** Method to store or update a