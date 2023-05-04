use async_trait::async_trait;
use chrono::Utc;
use event_listeners::{
	domain::{GithubEvent, GithubRepoIndex},
	infrastructure::database::GithubRepoIndexRepository,
};
use futures::future::try_join_all;

use super::Result;

pub struct Indexer<I: super::Indexer> {
	github_repo_index_repository: GithubRepoIndexRepository,
	indexer: I,
}

impl<I: super::Indexer> Indexer<I> {
	pub async fn index_all(&self) -> Result<Vec<GithubEvent>> {
		let handles = self
			.github_repo_index_repository
			.list()?
			.into_iter()
			.map(|repo_index| <Self as super::Indexer>::index(self, repo_index));

		Ok(try_join_all(handles).await?.into_iter().flatten().collect())
	}
}

#[async_trait]
impl<I: super::Indexer> super::Indexer for Indexer<I> {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>> {
		let events = self.indexer.index(repo_index.clone()).await?;

		self.github_repo_index_repository.upsert(&GithubRepoIndex::new(
			*repo_index.repo_id(),
			Some(Utc::now().naive_utc()),
			repo_index.state().clone(),
		))?;

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
