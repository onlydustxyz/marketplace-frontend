use std::sync::Arc;

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use domain::{GithubFetchIssueService, GithubRepoId, GithubServiceIssueFilters};
use infrastructure::database::Repository;
use serde::{Deserialize, Serialize};

use super::{
	error::{IgnoreErrors, Result},
	Crawler, Projector,
};
use crate::models::{
	ContributionsRepository, GithubRepoIndexRepository, ProjectGithubRepoRepository,
	ProjectsContributorRepository, ProjectsPendingContributorRepository,
};

pub type IssuesIndexer = dyn super::Indexer<GithubRepoId, Vec<domain::GithubIssue>>;

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchIssueService>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	github_issues_repository: Arc<dyn Repository<crate::models::GithubIssue>>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	projects_contributors_repository: Arc<dyn ProjectsContributorRepository>,
	projects_pending_contributors_repository: Arc<dyn ProjectsPendingContributorRepository>,
	project_github_repos_repository: Arc<dyn ProjectGithubRepoRepository>,
}

#[derive(new, Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
	last_update_time: DateTime<Utc>,
}

impl State {
	fn json(&self) -> serde_json::Result<serde_json::Value> {
		serde_json::to_value(self)
	}
}

impl Indexer {
	fn get_state(&self, repo_id: &GithubRepoId) -> anyhow::Result<Option<State>> {
		let state = match self.github_repo_index_repository.select_issues_indexer_state(&repo_id)? {
			Some(state) => {
				let state = serde_json::from_value(state)?;
				Some(state)
			},
			_ => None,
		};

		Ok(state)
	}
}

#[async_trait]
impl Crawler<GithubRepoId, Vec<domain::GithubIssue>> for Indexer {
	async fn fetch_modified_data(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Vec<domain::GithubIssue>> {
		let filters = GithubServiceIssueFilters {
			updated_since: self
				.get_state(repo_id)?
				.map(|state| state.last_update_time + chrono::Duration::milliseconds(1)),
		};

		let issues = self
			.github_fetch_service
			.issues_by_repo_id(*repo_id, filters)
			.await
			.ignore_non_fatal_errors()?;

		Ok(issues)
	}

	fn ack(&self, id: &GithubRepoId, data: Vec<domain::GithubIssue>) -> Result<()> {
		let mut updated_times: Vec<_> = data.iter().map(|issue| issue.updated_at).collect();

		updated_times.sort();

		if let Some(updated_at) = updated_times.pop() {
			let state = State::new(updated_at);
			self.github_repo_index_repository
				.update_issues_indexer_state(&id, state.json()?)?;
		}

		Ok(())
	}
}

#[async_trait]
impl Projector<GithubRepoId, Vec<domain::GithubIssue>> for Indexer {
	async fn perform_projections(
		&self,
		_id: &GithubRepoId,
		data: Vec<domain::GithubIssue>,
	) -> Result<()> {
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
