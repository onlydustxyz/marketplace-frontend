use std::{fmt, sync::Arc};

use domain::{
	GithubFetchService, GithubFullPullRequest, GithubPullRequest, GithubPullRequestNumber,
	GithubRepoId,
};

use crate::github_indexer::indexers::{self, error::Result, IndexerImpl};

#[derive(Debug, Clone, Copy)]
pub struct PullRequestId {
	repo_id: GithubRepoId,
	pr_number: GithubPullRequestNumber,
}

impl fmt::Display for PullRequestId {
	fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
		write!(f, "{}/{}", self.repo_id, self.pr_number)
	}
}

impl From<(GithubRepoId, GithubPullRequestNumber)> for PullRequestId {
	fn from((repo_id, pr_number): (GithubRepoId, GithubPullRequestNumber)) -> Self {
		Self { repo_id, pr_number }
	}
}

pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchService>,
	indexer: IndexerImpl<GithubPullRequest, Option<GithubFullPullRequest>>,
}

#[async_trait]
impl indexers::Indexer<PullRequestId> for Indexer {
	async fn index(&self, id: &PullRequestId) -> Result<()> {
		let pull_request = self
			.github_fetch_service
			.pull_request_by_repo_id(id.repo_id, id.pr_number)
			.await?;

		self.indexer.index(&pull_request).await
	}
}

impl fmt::Display for Indexer {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{}::from_id", self.indexer,)
	}
}

pub trait FromId {
	fn from_id(self, github_fetch_service: Arc<dyn GithubFetchService>) -> Indexer;
}

impl FromId for IndexerImpl<GithubPullRequest, Option<GithubFullPullRequest>> {
	fn from_id(self, github_fetch_service: Arc<dyn GithubFetchService>) -> Indexer {
		Indexer {
			github_fetch_service,
			indexer: self,
		}
	}
}
