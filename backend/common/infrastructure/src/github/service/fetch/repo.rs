use async_trait::async_trait;
use domain::{
	GithubFetchRepoService, GithubRepo, GithubRepoId, GithubRepoLanguages, GithubServiceError,
	GithubServiceResult,
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
	async fn repo_languages(&self, id: &GithubRepoId) -> GithubServiceResult<GithubRepoLanguages> {
		let languages = self.get_languages_by_repository_id(id).await?;
		Ok(languages)
	}
}
