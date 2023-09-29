use std::sync::Arc;

use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use infrastructure::dbclient::Repository;
use serde_json::json;

use super::super::error::Result;
use crate::{domain::indexers::Projector, models::GithubRepo};

#[derive(new)]
pub struct RepoProjector {
	github_repo_repository: Arc<dyn Repository<GithubRepo>>,
}

#[async_trait]
impl Projector<domain::GithubRepo> for RepoProjector {
	async fn perform_projections(&self, repo: domain::GithubRepo) -> Result<()> {
		self.github_repo_repository.upsert(GithubRepo {
			id: repo.id,
			owner: repo.owner,
			name: repo.name,
			updated_at: Some(Utc::now().naive_utc()),
			description: repo.description,
			stars: repo.stars,
			fork_count: repo.forks_count,
			html_url: repo.html_url.to_string(),
			languages: json!({}),
			parent_id: None,
			has_issues: repo.has_issues,
		})?;
		Ok(())
	}
}
