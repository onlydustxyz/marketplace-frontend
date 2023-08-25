use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFullPullRequest, GithubPullRequest};

use super::{super::error::Result, Projector};
use crate::models::{
	ContributionsRepository, GithubPullRequestRepository, ProjectGithubRepoRepository,
	ProjectsContributorRepository, ProjectsPendingContributorRepository,
};

#[derive(new)]
pub struct PullRequestProjector {
	github_pull_requests_repository: Arc<dyn GithubPullRequestRepository>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	projects_contributors_repository: Arc<dyn ProjectsContributorRepository>,
	projects_pending_contributors_repository: Arc<dyn ProjectsPendingContributorRepository>,
	project_github_repos_repository: Arc<dyn ProjectGithubRepoRepository>,
}

#[async_trait]
impl Projector<GithubPullRequest, Option<GithubFullPullRequest>> for PullRequestProjector {
	async fn perform_projections(
		&self,
		_pull_request: &GithubPullRequest,
		data: Option<GithubFullPullRequest>,
	) -> Result<()> {
		if let Some(pull_request) = data {
			let pull_request: crate::models::GithubPullRequest = pull_request.into();

			self.github_pull_requests_repository.upsert(pull_request.clone())?;

			self.contributions_repository
				.upsert_from_github_pull_request(pull_request.clone())?;

			self.project_github_repos_repository
				.find_projects_of_repo(&pull_request.inner.repo_id)?
				.iter()
				.try_for_each(|project_id| {
					self.projects_contributors_repository
						.refresh_project_contributor_list(project_id)?;
					self.projects_pending_contributors_repository
						.refresh_project_pending_contributor_list(project_id)
					//TODO: insert non-yet-indexed contributors to user-indexes
				})?;
		}
		Ok(())
	}
}
