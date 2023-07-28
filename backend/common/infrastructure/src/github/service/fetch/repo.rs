use std::sync::Arc;

use async_trait::async_trait;
use domain::{
	stream_filter, GithubFetchRepoService, GithubRepo, GithubRepoId, GithubServiceError,
	GithubServiceResult, GithubUser, Languages,
};
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
}
