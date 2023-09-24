use std::sync::Arc;

use domain::{GithubFetchIssueService, GithubIssue, GithubRepoId};
use infrastructure::database::Repository;

use self::{crawler::IssuesCrawler, projector::IssuesProjector};
use super::{contributors_projector::ContributorsProjector, Crawler, IndexerImpl, Projector};
use crate::models::{ContributionsRepository, GithubRepoIndexRepository};

mod crawler;
mod projector;

pub fn new(
	github_fetch_service: Arc<dyn GithubFetchIssueService>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	github_issues_repository: Arc<dyn Repository<crate::models::GithubIssue>>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	contributors_projector: ContributorsProjector,
) -> IndexerImpl<GithubRepoId, Vec<GithubIssue>> {
	IndexerImpl {
		crawler: Arc::new(IssuesCrawler::new(
			github_fetch_service,
			github_repo_index_repository,
		)),
		projector: Arc::new(IssuesProjector::new(
			github_issues_repository,
			contributions_repository,
			contributors_projector,
		)),
	}
}
