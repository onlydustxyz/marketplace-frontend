use std::sync::Arc;

use domain::{GithubFetchIssueService, GithubIssue, GithubIssueNumber, GithubRepoId};
use infrastructure::database::Repository;

use self::{crawler::IssueCrawler, projector::IssueProjector};
use super::{Crawler, IndexerImpl, Projector};

mod crawler;
mod projector;

pub fn new(
	github_fetch_service: Arc<dyn GithubFetchIssueService>,
	github_issues_repository: Arc<dyn Repository<crate::models::GithubIssue>>,
) -> IndexerImpl<IssueId, GithubIssue> {
	IndexerImpl {
		crawler: Arc::new(IssueCrawler::new(github_fetch_service)),
		projector: Arc::new(IssueProjector::new(github_issues_repository)),
	}
}

type IssueId = (GithubRepoId, GithubIssueNumber);
