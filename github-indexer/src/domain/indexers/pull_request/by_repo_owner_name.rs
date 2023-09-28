use std::{fmt, sync::Arc};

use domain::{
	GithubFetchService, GithubFullPullRequest, GithubPullRequest, GithubPullRequestNumber,
};

use crate::domain::indexers::{self, error::Result, IndexerImpl};

pub type PullRequestId = (String, String, GithubPullRequestNumber);

pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchService>,
	indexer: IndexerImpl<GithubPullRequest, Option<GithubFullPullRequest>>,
}

#[async_trait]
impl indexers::Indexer<PullRequestId> for Indexer {
	type Output = Option<GithubFullPullRequest>;

	async fn index(
		&self,
		(repo_owner, repo_name, number): &PullRequestId,
	) -> Result<Option<GithubFullPullRequest>> {
		let pull_request = self
			.github_fetch_service
			.pull_request(repo_owner.clone(), repo_name.clone(), *number)
			.await?;

		self.indexer.index(&pull_request).await
	}
}

impl fmt::Display for Indexer {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{}::from_id", self.indexer,)
	}
}

pub trait ByRepoOwnerName {
	fn by_repo_owner_name(self, github_fetch_service: Arc<dyn GithubFetchService>) -> Indexer;
}

impl ByRepoOwnerName for IndexerImpl<GithubPullRequest, Option<GithubFullPullRequest>> {
	fn by_repo_owner_name(self, github_fetch_service: Arc<dyn GithubFetchService>) -> Indexer {
		Indexer {
			github_fetch_service,
			indexer: self,
		}
	}
}
