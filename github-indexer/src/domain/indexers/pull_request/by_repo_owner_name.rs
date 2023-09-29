use std::{fmt, sync::Arc};

use domain::{
	GithubFetchService, GithubFullPullRequest, GithubFullUser, GithubPullRequest,
	GithubPullRequestNumber, GithubRepo, GithubRepoId, GithubUserId,
};

use crate::domain::indexers::{self, error::Result, IndexerImpl};

pub type PullRequestId = (String, String, GithubPullRequestNumber);

pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchService>,
	pr_indexer: IndexerImpl<GithubPullRequest, Option<GithubFullPullRequest>>,
	user_indexer: Arc<dyn indexers::Indexer<GithubUserId, Output = Option<GithubFullUser>>>,
	repo_indexer: Arc<dyn indexers::Indexer<GithubRepoId, Output = GithubRepo>>,
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

		self.user_indexer.index(&pull_request.author.id).await?;
		self.repo_indexer.index(&pull_request.repo_id).await?;
		self.pr_indexer.index(&pull_request).await
	}
}

impl fmt::Display for Indexer {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{}::from_id", self.pr_indexer,)
	}
}

pub trait ByRepoOwnerName {
	fn by_repo_owner_name(
		self,
		github_fetch_service: Arc<dyn GithubFetchService>,
		repo_indexer: Arc<dyn indexers::Indexer<GithubRepoId, Output = GithubRepo>>,
		user_indexer: Arc<dyn indexers::Indexer<GithubUserId, Output = Option<GithubFullUser>>>,
	) -> Indexer;
}

impl ByRepoOwnerName for IndexerImpl<GithubPullRequest, Option<GithubFullPullRequest>> {
	fn by_repo_owner_name(
		self,
		github_fetch_service: Arc<dyn GithubFetchService>,
		repo_indexer: Arc<dyn indexers::Indexer<GithubRepoId, Output = GithubRepo>>,
		user_indexer: Arc<dyn indexers::Indexer<GithubUserId, Output = Option<GithubFullUser>>>,
	) -> Indexer {
		Indexer {
			github_fetch_service,
			pr_indexer: self,
			repo_indexer,
			user_indexer,
		}
	}
}
