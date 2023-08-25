use std::sync::Arc;

use domain::{GithubFetchIssueService, GithubIssue, GithubRepoId};
use infrastructure::database::Repository;

use self::{crawler::IssuesCrawler, projector::IssuesProjector};
use super::{Crawler, IndexerImpl, Projector};
use crate::models::{
	ContributionsRepository, GithubRepoIndexRepository, ProjectGithubRepoRepository,
	ProjectsContributorRepository, ProjectsPendingContributorRepository,
};

mod crawler;
mod projector;

pub fn new(
	github_fetch_service: Arc<dyn GithubFetchIssueService>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	github_issues_repository: Arc<dyn Repository<crate::models::GithubIssue>>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	projects_contributors_repository: Arc<dyn ProjectsContributorRepository>,
	projects_pending_contributors_repository: Arc<dyn ProjectsPendingContributorRepository>,
	project_github_repos_repository: Arc<dyn ProjectGithubRepoRepository>,
) -> IndexerImpl<GithubRepoId, Vec<GithubIssue>> {
	IndexerImpl {
		crawler: Arc::new(IssuesCrawler::new(
			github_fetch_service,
			github_repo_index_repository,
		)),
		projector: Arc::new(IssuesProjector::new(
			github_issues_repository,
			contributions_repository,
			projects_contributors_repository,
			projects_pending_contributors_repository,
			project_github_repos_repository,
		)),
	}
}
