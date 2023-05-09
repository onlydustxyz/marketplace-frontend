use async_trait::async_trait;
use chrono::Utc;
use event_listeners::{
	domain::{GithubEvent, GithubRepoIndex},
	infrastructure::database::GithubRepoIndexRepository,
};

use super::Result;

pub struct Indexer<I: super::Indexer> {
	github_repo_index_repository: GithubRepoIndexRepository,
	indexer: I,
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(repo_index.clone()).await?;
		let repo_index = GithubRepoIndex::new(*repo_index.repo_id(), Some(Utc::now().naive_utc()));
		self.github_repo_index_repository.upsert(&repo_index)?;
		Ok(events)
	}
}

pub trait WithState<I: super::Indexer> {
	fn with_state(self, github_repo_index_repository: GithubRepoIndexRepository) -> Indexer<I>;
}

impl<I: super::Indexer> WithState<I> for I {
	fn with_state(self, github_repo_index_repository: GithubRepoIndexRepository) -> Indexer<I> {
		Indexer {
			github_repo_index_repository,
			indexer: self,
		}
	}
}
