use anyhow::Result;
use derive_more::Constructor;
use domain::{DomainError, GithubIssueNumber, GithubRepoId, ProjectId};
use tracing::instrument;

use crate::models::*;

#[derive(Constructor)]
pub struct Usecase {
	ignored_github_issues_repository: IgnoredGithubIssuesRepository,
}

impl Usecase {
	#[instrument(skip(self))]
	pub fn add(
		&self,
		project_id: &ProjectId,
		repo_id: &GithubRepoId,
		issue_number: &GithubIssueNumber,
	) -> Result<(), DomainError> {
		self.ignored_github_issues_repository
			.try_insert(project_id, repo_id, issue_number)?;
		Ok(())
	}

	#[instrument(skip(self))]
	pub fn remove(
		&self,
		project_id: &ProjectId,
		repo_id: &GithubRepoId,
		issue_number: &GithubIssueNumber,
	) -> Result<(), DomainError> {
		self.ignored_github_issues_repository
			.delete(project_id, repo_id, issue_number)?;
		Ok(())
	}
}
