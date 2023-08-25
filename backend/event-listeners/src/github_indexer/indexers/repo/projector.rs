use std::sync::Arc;

use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::GithubRepoId;
use infrastructure::database::{ImmutableRepository, Repository};

use super::{super::error::Result, IndexedRepo};
use crate::{
	github_indexer::indexers::Projector,
	models::{GithubRepo, Technology},
};

#[derive(new)]
pub struct RepoProjector {
	github_repo_repository: Arc<dyn Repository<GithubRepo>>,
	technologies_repository: Arc<dyn ImmutableRepository<Technology>>,
}

#[async_trait]
impl Projector<GithubRepoId, Option<IndexedRepo>> for RepoProjector {
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
