use std::{
	collections::hash_map::DefaultHasher,
	hash::{Hash, Hasher},
	sync::Arc,
};

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchRepoService, GithubRepo, GithubRepoId, LogErr};
use event_listeners::domain::{GithubEvent, GithubRepoIndexRepository};
use serde::{Deserialize, Serialize};

use super::Result;

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
	fn get_state(&self, repo_id: GithubRepoId) -> Option<State> {
		self.github_repo_index_repository
			.select_repo_indexer_state(&repo_id)
			.ok()
			.and_then(|state| {
				serde_json::from_value(state)
					.log_err("Unable to deserialize repo indexer state")
					.ok()
			})
	}
}

#[async_trait]
impl super::Indexer for Indexer {
	type Id = GithubRepoId;

	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let repo = self.github_fetch_service.repo_by_id(&repo_id).await?;

		let events = match self.get_state(repo_id) {
			Some(state) if state == State::new(&repo) => vec![],
			_ => vec![GithubEvent::Repo(repo)],
		};

		Ok(events)
	}
}

fn hash<T: Hash>(t: &T) -> u64 {
	let mut s = DefaultHasher::new();
	t.hash(&mut s);
	s.finish()
}

impl super::Stateful<GithubRepoId> for Indexer {
	fn store(&self, id: GithubRepoId, events: &[GithubEvent]) -> anyhow::Result<()> {
		if let Some(GithubEvent::Repo(repo)) = events.last() {
			self.github_repo_index_repository
				.upsert_repo_indexer_state(&id, serde_json::to_value(State::new(repo))?)?;
		}
		Ok(())
	}
}
