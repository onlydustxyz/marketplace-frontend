use std::sync::Arc;

use domain::{GithubFetchService, GithubFullPullRequest, GithubPullRequest};

use self::{crawler::PullRequestCrawler, projector::PullRequestProjector};
use super::{Crawler, IndexerImpl, Projector};
use crate::models::{
	github_pull_request_indexes, ContributionsRepository, GithubPullRequestRepository,
	ProjectGithubRepoRepository, ProjectsContributorRepository,
	ProjectsPendingContributorRepository,
};

mod crawler;
mod projector;

pub fn new(
	github_fetch_service: Arc<dyn GithubFetchService>,
	github_pull_request_index_repository: Arc<dyn github_pull_request_indexes::Repository>,
	github_pull_requests_repository: Arc<dyn GithubPullRequestRepository>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	projects_contributors_repository: Arc<dyn ProjectsContributorRepository>,
	projects_pending_contributors_repository: Arc<dyn ProjectsPendingContributorRepository>,
	project_github_repos_repository: Arc<dyn ProjectGithubRepoRepository>,
) -> IndexerImpl<GithubPullRequest, Option<GithubFullPullRequest>> {
	IndexerImpl {
		crawler: Arc::new(PullRequestCrawler::new(
			github_fetch_service,
			github_pull_request_index_repository,
		)),
		projector: Arc::new(PullRequestProjector::new(
			github_pull_requests_repository,
			contributions_repository,
			projects_contributors_repository,
			projects_pending_contributors_repository,
			project_github_repos_repository,
		)),
	}
}
