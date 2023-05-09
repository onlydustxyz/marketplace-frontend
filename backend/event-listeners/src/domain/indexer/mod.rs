use async_trait::async_trait;

mod error;
use domain::GithubRepoId;
pub use error::{Error, IgnoreErrors, Result};

use crate::domain::GithubEvent;

#[async_trait]
pub trait Indexer: Send + Sync {
	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>>;
}
