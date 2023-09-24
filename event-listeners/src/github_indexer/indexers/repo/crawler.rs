use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchRepoService, GithubRepoId, GithubServiceError};
use serde::{Deserialize, Serialize};

use super::{super::error::Result, IndexedRepo};
use crate::{
	github_indexer::indexers::{hash, Crawler},
	models::GithubRepoIndexRepository,
};

#[derive(new)]
pub struct RepoCrawler {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
}

#[derive(Clone, Serialize, Deserialize, PartialEq, Eq)]
struct State {
	hash: u64,
}

impl State {
	fn json(&self) -> serde_json::Result<serde_json::Value> {
		serde_json::to_value(self)
	}
}

impl State {
	pub fn new(repo: &domain::GithubRepo) -> Self {
		Self { hash: hash(repo) }
	}
}

impl RepoCrawler {
	fn get_state(&self, repo_id: &GithubRepoId) -> anyhow::Result<Option<State>> {
		let state = match self.github_repo_index_repository.select_repo_indexer_state(repo_id)? {
			Some(state) => {
				let state = serde_json::from_value(state)?;
				Some(state)
			},
			_ => None,
		};

		Ok(state)
	}
}

#[async_trait]
impl Crawler<GithubRepoId, Option<IndexedRepo>> for RepoCrawler {
	async fn fetch_modified_data(&self, repo_id: &GithubRepoId) -> Result<Option<IndexedRepo>> {
		match self.github_fetch_service.repo_by_id(*repo_id).await {
			Ok(repo) => match self.get_state(repo_id)? {
				Some(state) if state == State::new(&repo) => Ok(None),
				_ => {
					let languages = self.github_fetch_service.repo_languages(repo.id).await?;
					let parent = match repo.clone().parent {
						Some(parent) => self.fetch_modified_data(&parent.id).await?,
						None => None,
					};
					Ok(Some(IndexedRepo {
						repo,
						languages,
						parent: parent.map(Box::new),
					}))
				},
			},

			Err(error) => match error {
				GithubServiceError::NotFound(_) => {
					olog::warn!(
						repo_id = repo_id.to_string(),
						"Github repo not found. Skipping repo indexing."
					);
					Ok(None)
				},
				_ => Err(error.into()),
			},
		}
	}

	fn ack(&self, id: &GithubRepoId, data: Option<IndexedRepo>) -> Result<()> {
		if let Some(indexed_repo) = data {
			let state = State::new(&indexed_repo.repo);
			self.github_repo_index_repository.update_repo_indexer_state(id, state.json()?)?;
		}
		Ok(())
	}
}
