mod error;
use async_trait::async_trait;
pub use error::{Error, Result};

use crate::domain::{GithubEvent, GithubRepoIndex};

#[async_trait]
pub trait Indexer: Send + Sync {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>>;
}
