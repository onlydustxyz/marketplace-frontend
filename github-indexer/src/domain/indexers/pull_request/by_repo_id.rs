use std::{fmt, sync::Arc};

use domain::{
	GithubFetchService, GithubFullPullRequest, GithubPullRequest, GithubPullRequestNumber,
	GithubRepoId,
};

use crate::domain::indexers::{self, error::Result, IndexerImpl};

pub type PullRequestId = (GithubRepoId, GithubPullRequestNumber);

pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchService>,
	indexer: IndexerImpl<GithubPullRequest, Option<GithubFullPullRequest>>,
}

#[async_trait]
impl indexers::Indexer<PullRequestId> for Indexer {
	type Output = Option<GithubFullPullRequest>;

	async fn index(
		&self,
		(repo_id, number): &PullRequestId,
	) -> Result<Option<GithubFullPullRequest>> {
		let pull_request =
			self.github_fetch_service.pull_request_by_repo_id(*repo_id, *number).await?;

		self.indexer.index(&pull_request).await
	}
}

impl fmt::Display for Indexer {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{}::from_id", self.indexer,)
	}
}

pub trait ByRepoId {
	fn by_repo_id(self, github_fetch_service: Arc<dyn GithubFetchService>) -> Indexer;
}

impl ByRepoId for IndexerImpl<GithubPullRequest, Option<GithubFullPullRequest>> {
	fn by_repo_id(self, github_fetch_service: Arc<dyn GithubFetchService>) -> Indexer {
		Indexer {
			github_fetch_service,
			indexer: self,
		}
	}
}
