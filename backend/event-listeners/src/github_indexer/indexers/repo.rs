use std::sync::Arc;

use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::{GithubFetchRepoService, GithubRepoId, GithubServiceError, Languages};
use infrastructure::database::{ImmutableRepository, Repository};
use serde::{Deserialize, Serialize};

use super::{error::Result, Crawler, Projector};
use crate::{
	github_indexer::indexer::hash,
	models::{GithubRepo, GithubRepoIndexRepository, Technology},
};

pub type RepoIndexer = dyn super::Indexer<GithubRepoId, Option<IndexedRepo>>;

#[derive(Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct IndexedRepo {
	repo: domain::GithubRepo,
	languages: Languages,
	parent: Option<Box<IndexedRepo>>,
}

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,

	github_repo_repository: Arc<dyn Repository<GithubRepo>>,
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	technologies_repository: Arc<dyn ImmutableRepository<Technology>>,
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

impl Indexer {
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
impl Crawler<GithubRepoId, Option<IndexedRepo>> for Indexer {
	async fn fetch_modified_data(&self, repo_id: &GithubRepoId) -> Result<Option<IndexedRepo>> {
		match self.github_fetch_service.repo_by_id(*repo_id).await {
			Ok(repo) => match self.get_state(&repo_id)? {
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
			self.github_repo_index_repository
				.update_repo_indexer_state(&id, state.json()?)?;
		}
		Ok(())
	}
}

#[async_trait]
impl Projector<GithubRepoId, Option<IndexedRepo>> for Indexer {
	async fn perform_projections(
		&self,
		_id: &GithubRepoId,
		data: Option<IndexedRepo>,
	) -> Result<()> {
		if let Some(indexed_repo) = data {
			indexed_repo.languages.get_all().into_iter().try_for_each(|language| {
				self.technologies_repository
					.try_insert(Technology {
						technology: language,
					})
					.map(|_| ())
			})?;

			let repo = indexed_repo.repo;
			self.github_repo_repository.upsert(GithubRepo {
				id: repo.id,
				owner: repo.owner,
				name: repo.name,
				updated_at: Some(Utc::now().naive_utc()),
				description: repo.description,
				stars: repo.stars,
				fork_count: repo.forks_count,
				html_url: repo.html_url.to_string(),
				languages: serde_json::to_value(indexed_repo.languages)?,
				parent_id: repo.parent.map(|repo| repo.id),
				has_issues: repo.has_issues,
			})?;

			if let Some(parent) = indexed_repo.parent {
				self.perform_projections(&parent.repo.id.clone(), Some(*parent)).await?;
			}
		}
		Ok(())
	}
}
