use thiserror::Error;

use crate::ports::output::{clean_storage, github_api};

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	CleanStorage(#[from] clean_storage::Error),
	#[error(transparent)]
	GithubApi(#[from] github_api::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

#[async_trait]
pub trait IndexingFacadePort: Send + Sync {
	async fn index_repo(&self, repo_id: u64) -> Result<()>;
}
