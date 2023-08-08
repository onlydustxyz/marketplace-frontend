use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchRepoService, GithubRepo, GithubRepoId, GithubServiceError};
use serde::{Deserialize, Serialize};

use super::Result;
use crate::{
	github_indexer::indexer::hash, listeners::github::Event as GithubEvent,
	models::GithubRepoIndexRepository,
};

#[derive(new)]
pub struct Indexer {
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
	pub fn new(repo: &GithubRepo) -> Self {
		Self { hash: hash(repo) }
	}
}

impl Indexer {
	fn get_state(&self, repo_id: GithubRepoId) -> anyhow::Result<Option<State>> {
		let state = match self.github_repo_index_repository.select_repo_indexer_state(&repo_id)? {
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
impl super::Indexer<GithubRepoId> for Indexer {
	fn name(&self) -> String {
		String::from("repo")
	}

	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		match self.github_fetch_service.repo_by_id(repo_id).await {
			Ok(repo) => {
				let events = match self.get_state(repo_id)? {
					Some(state) if state == State::new(&repo) => vec![],
					_ => vec![GithubEvent::Repo(repo)],
				};

				Ok(events)
			},
			Err(error) => match error {
				GithubServiceError::NotFound(_) => {
					olog::warn!(
						repo_id = repo_id.to_string(),
						"Github repo not found. Skipping repo indexing."
					);
					Ok(vec![])
				},
				_ => Err(error.into()),
			},
		}
	}
}

impl super::Stateful<GithubRepoId> for Indexer {
	fn store(&self, id: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
		if let Some(GithubEvent::Repo(repo)) = events.last() {
			let state = State::new(repo);
			self.github_repo_index_repository
				.update_repo_indexer_state(&id, state.json()?)?;
		}
		Ok(())
	}
}
