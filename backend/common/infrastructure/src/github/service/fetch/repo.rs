use async_trait::async_trait;
use domain::{
	GithubFetchRepoService, GithubRepo, GithubRepoLanguages, GithubRepositoryId,
	GithubServiceError, GithubServiceFilters, GithubServiceResult, LogErr,
};
use serde_json::Value;
use tracing::instrument;
use url::Url;

use crate::{github, github::RepoFromOctocrab};

#[async_trait]
impl GithubFetchRepoService for github::Client {
	#[instrument(skip(self))]
	async fn repo_by_id(&self, id: &GithubRepositoryId) -> GithubServiceResult<GithubRepo> {
		let repo = self.get_repository_by_id(id).await?;
		let repo = GithubRepo::try_from_octocrab_repo(self, repo)
			.await
			.map_err(GithubServiceError::Other)?;
		Ok(repo)
	}

	#[instrument(skip(self))]
	async fn repo_by_url(&self, url: &Url) -> GithubServiceResult<GithubRepo> {
		let repo = self.get_as::<_, octocrab::models::Repository>(url).await?;
		let repo = GithubRepo::try_from_octocrab_repo(self, repo)
			.await
			.map_err(GithubServiceError::Other)?;
		Ok(repo)
	}

	#[instrument(skip(self))]
	async fn repo_languages(
		&self,
		id: &GithubRepositoryId,
	) -> GithubServiceResult<GithubRepoLanguages> {
		let languages = self.get_languages_by_repository_id(id).await?;
		Ok(languages)
	}

	async fn repo_events(
		&self,
		id: &GithubRepositoryId,
		filters: &GithubServiceFilters,
	) -> GithubServiceResult<Vec<Value>> {
		let events = self
			.events_by_repo_id(id, filters)
			.await?
			.into_iter()
			.filter_map(|event| {
				serde_json::to_value(event).log_err("Unable to serialize github event").ok()
			})
			.collect();

		Ok(events)
	}
}
