use std::sync::Arc;

use domain::{GithubFetchRepoService, GithubRepo, GithubRepoId};
use infrastructure::database::Repository;

use self::{crawler::RepoCrawler, projector::RepoProjector};
use super::IndexerImpl;
use crate::models;

mod crawler;
mod projector;

pub fn new(
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
	github_repo_repository: Arc<dyn Repository<models::GithubRepo>>,
) -> IndexerImpl<GithubRepoId, GithubRepo> {
	IndexerImpl {
		crawler: Arc::new(RepoCrawler::new(github_fetch_service)),
		projector: Arc::new(RepoProjector::new(github_repo_repository)),
	}
}
