use std::sync::Arc;

use async_trait::async_trait;
use domain::{
	stream_filter, GithubCiChecks, GithubFetchRepoService, GithubRepo, GithubRepoId,
	GithubServiceError, GithubServiceResult, GithubUser, Languages,
};
use octocrab::models::CheckStatus;
use tracing::instrument;

use crate::github::{self, OctocrabRepo};

#[async_trait]
impl GithubFetchRepoService for github::Client {
	#[instrument(skip(self))]
	async fn repo_by_id(&self, id: GithubRepoId) -> GithubServiceResult<GithubRepo> {
		let repo = self.get_repository_by_id(id).await?;
		let repo = OctocrabRepo::from(repo).try_into().map_err(GithubServiceError::Other)?;
		Ok(repo)
	}

	#[instrument(skip(self))]
	async fn repo_languages(&self, id: GithubRepoId) -> GithubServiceResult<Languages> {
		let languages = self.get_languages_by_repository_id(id).await?;
		Ok(languages)
	}

	#[instrument(skip(self, filters))]
	async fn repo_contributors(
		&self,
		repo_id: &GithubRepoId,
		filters: Arc<dyn stream_filter::Filter<I = GithubUser>>,
	) -> GithubServiceResult<Vec<GithubUser>> {
		let users = self.get_contributors_by_repository_id(repo_id, filters).await?;
		Ok(users)
	}

	#[instrument(skip(self))]
	async fn ci_checks(
		&self,
		repo_id: GithubRepoId,
		sha: String,
	) -> GithubServiceResult<Option<GithubCiChecks>> {
		let check_runs = self.get_check_runs(repo_id, sha).await?.check_runs;

		if check_runs.iter().any(|run| {
			run.status == Some(CheckStatus::Completed)
				&& run.conclusion == Some(String::from("failure"))
		}) {
			// At least one check failed => Failed
			return Ok(Some(domain::GithubCiChecks::Failed));
		}

		if check_runs.iter().any(|run| run.status != Some(CheckStatus::Completed)) {
			// At least one check is not completed => None
			return Ok(None);
		}

		match check_runs.len() {
			0 => Ok(None),                                 // No check => None
			_ => Ok(Some(domain::GithubCiChecks::Passed)), // All completed, no failure => Passed
		}
	}
}
