use async_trait::async_trait;

mod error;
pub use error::{Error, IgnoreErrors, Result};

use crate::domain::{GithubEvent, GithubRepoIndex};

#[async_trait]
pub trait Indexer: Send + Sync {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>>;
}
