use std::sync::Arc;

use domain::{GithubFetchRepoService, GithubRepoId, Languages};
use infrastructure::dbclient::{ImmutableRepository, Repository};
use serde::{Deserialize, Serialize};

use self::{crawler::RepoCrawler, projector::RepoProjector};
use super::IndexerImpl;
use crate::models::{GithubRepo, GithubRepoIndexRepository, Technology};

mod crawler;
mod projector;

#[derive(Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct IndexedRepo {
	pub repo: domain::GithubRepo,
	pub languages: Languages,
	pub parent: Option<Box<IndexedRepo>>,
}

pub fn new(
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	github_repo_repository: Arc<dyn Repository<GithubRepo>>,
	technologies_repository: Arc<dyn ImmutableRepository<Technology>>,
) -> IndexerImpl<GithubRepoId, Option<IndexedRepo>> {
	IndexerImpl {
		crawler: Arc::new(RepoCrawler::new(
			github_fetch_service,
			github_repo_index_repository,
		)),
		projector: Arc::new(RepoProjector::new(
			github_repo_repository,
			technologies_repository,
		)),
	}
}
