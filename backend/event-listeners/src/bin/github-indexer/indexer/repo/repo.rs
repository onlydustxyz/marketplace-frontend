use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchRepoService, GithubRepo, GithubRepoId};
use event_listeners::domain::{GithubEvent, GithubRepoIndexRepository};
use serde::{Deserialize, Serialize};

use super::Result;
use crate::indexer::hash;

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
impl super::Indexer for Indexer {
	type Id = GithubRepoId;

	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let repo = self.github_fetch_service.repo_by_id(&repo_id).await?;

		let events = match self.get_state(repo_id)? {
			Some(state) if state == State::new(&repo) => vec![],
			_ => vec![GithubEvent::Repo(repo)],
		};

		Ok(events)
	}
}

impl super::Stateful<GithubRepoId> for Indexer {
	fn store(&self, id: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
		if let Some(GithubEvent::Repo(repo)) = events.last() {
			self.github_repo_index_repository
				.update_repo_indexer_state(&id, serde_json::to_value(State::new(repo))?)?;
		}
		Ok(())
	}
}
