use std::sync::Arc;

use domain::GithubRepoId;

use super::{indexers, indexers::error::Result};

struct Scheduler {
	repo_indexers: Vec<Arc<dyn indexers::Indexer<GithubRepoId>>>,
}

impl Scheduler {
	pub async fn index_repo(&self, id: &GithubRepoId) -> Result<()> {
		for indexer in &self.repo_indexers {
			indexer.index(id).await?;
		}
		Ok(())
	}
}
