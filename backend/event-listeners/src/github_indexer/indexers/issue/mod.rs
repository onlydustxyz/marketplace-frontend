use std::{fmt::Display, sync::Arc};

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

#[derive(Debug, Clone, Copy)]
pub struct IssueId {
	repo_id: GithubRepoId,
	issue_number: GithubIssueNumber,
}

impl Display for IssueId {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}/{}", self.repo_id, self.issue_number)
	}
}

impl From<(GithubRepoId, GithubIssueNumber)> for IssueId {
	fn from((repo_id, issue_number): (GithubRepoId, GithubIssueNumber)) -> Self {
		Self {
			repo_id,
			issue_number,
		}
	}
}
