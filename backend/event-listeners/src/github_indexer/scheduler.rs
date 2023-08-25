use std::sync::Arc;

use domain::{GithubPullRequest, GithubRepoId};

use super::{indexers, indexers::error::Result};

struct Scheduler {
	repo_indexer: Arc<indexers::RepoIndexer>,
	pull_requests_indexer: Arc<indexers::PullRequestsIndexer>,
}

impl Scheduler {
	pub async fn index_repo(&self, id: &GithubRepoId) -> Result<()> {
		self.repo_indexer.index(id).await?;
		self.pull_requests_indexer.index(id).await?;
		Ok(())
	}
}
