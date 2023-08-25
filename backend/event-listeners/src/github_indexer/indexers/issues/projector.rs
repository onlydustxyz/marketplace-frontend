use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubIssue, GithubRepoId};
use infrastructure::database::Repository;

use super::{super::error::Result, Projector};
use crate::models::{
	ContributionsRepository, ProjectGithubRepoRepository, ProjectsContributorRepository,
	ProjectsPendingContributorRepository,
};

#[derive(new)]
pub struct IssuesProjector {
	github_issues_repository: Arc<dyn Repository<crate::models::GithubIssue>>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	projects_contributors_repository: Arc<dyn ProjectsContributorRepository>,
	projects_pending_contributors_repository: Arc<dyn ProjectsPendingContributorRepository>,
	project_github_repos_repository: Arc<dyn ProjectGithubRepoRepository>,
}

#[async_trait]
impl Projector<GithubRepoId, Vec<GithubIssue>> for IssuesProjector {
	async fn perform_projections(&self, _id: &GithubRepoId, data: Vec<GithubIssue>) -> Result<()> {
		for issue in data {
			let issue: crate::models::GithubIssue = issue.into();
			self.github_issues_repository.upsert(issue.clone())?;
			self.contributions_repository.upsert_from_github_issue(issue.clone())?;

			self.project_github_repos_repository
				.find_projects_of_repo(&issue.repo_id)?
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
