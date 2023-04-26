mod error;
use error::*;

pub mod composite;
pub mod logged;
pub mod published;
pub mod pulls;
pub mod repo;
pub mod with_state;

use async_trait::async_trait;
use event_listeners::domain::{GithubEvent, GithubRepoIndex};

#[async_trait]
pub trait Indexer: Send + Sync {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>>;
}
