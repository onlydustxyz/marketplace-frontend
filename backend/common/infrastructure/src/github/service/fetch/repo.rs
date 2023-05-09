use std::sync::Arc;

use async_trait::async_trait;
use domain::{
	stream_filter, GithubFetchRepoService, GithubRepo, GithubRepoId, GithubRepoLanguages,
	GithubServiceError, GithubServiceResult, GithubUser,
};
use tracing::instrument;

use crate::{github, github::RepoFromOctocrab};

#[async_trait]
impl GithubFetchRepoService for github::Client {
	#[instrument(skip(self))]
	async fn repo_by_id(&self, id: &GithubRepoId) -> GithubServiceResult<GithubRepo> {
		let repo = self.get_repository_by_id(id).await?;
		let repo = GithubRepo::try_from_octocrab_repo(self, repo)
			.await
			.map_err(GithubServiceError::Other)?;
		Ok(repo)
	}

	#[instrument(skip(self))]
	async fn etagged_repo_by_id(
		&self,
		id: &GithubRepoId,
	) -> GithubServiceResult<(Option<String>, GithubRepo)> {
		let (etag, repo) = self.get_etagged_repository_by_id_with_etag(id).await?;

		let repo = GithubRepo::try_from_octocrab_repo(self, repo)
			.await
			.map_err(GithubServiceError::Other)?;

		Ok((etag, repo))
	}

	#[instrument(skip(self))]
	async fn repo_languages(&self, id: &GithubRepoId) -> GithubServiceResult<GithubRepoLanguages> {
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
