use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchRepoService, GithubRepo, GithubRepoId};

use super::super::error::Result;
use crate::domain::indexers::Crawler;

#[derive(new)]
pub struct RepoCrawler {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
}

#[async_trait]
impl Crawler<GithubRepoId, GithubRepo> for RepoCrawler {
	async fn fetch_modified_data(&self, repo_id: &GithubRepoId) -> Result<GithubRepo> {
		let repo = self.github_fetch_service.repo_by_id(*repo_id).await?;
		Ok(repo)
	}

	fn ack(&self, _id: &GithubRepoId, _data: GithubRepo) -> Result<()> {
		Ok(())
	}
}
