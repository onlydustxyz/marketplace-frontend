use std::sync::Arc;

use domain::{GithubFetchPullRequestService, GithubPullRequest, GithubRepoId};

use self::{crawler::PullRequestsCrawler, projector::PullRequestsProjector};
use super::{Crawler, Indexer, IndexerImpl, Projector};
use crate::models::GithubRepoIndexRepository;

mod crawler;
mod projector;

pub fn new(
	github_fetch_service: Arc<dyn GithubFetchPullRequestService>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	pull_request_indexer: Arc<dyn Indexer<GithubPullRequest>>,
) -> IndexerImpl<GithubRepoId, Vec<GithubPullRequest>> {
	IndexerImpl {
		crawler: Arc::new(PullRequestsCrawler::new(
			github_fetch_service,
			github_repo_index_repository,
		)),
		projector: Arc::new(PullRequestsProjector::new(pull_request_indexer)),
	}
}
