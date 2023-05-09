use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchIssueService, GithubRepoId, GithubServiceIssueFilters};
use event_listeners::domain::GithubEvent;

use super::{IgnoreIndexerErrors, Result};

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchIssueService>,
}

#[async_trait]
impl super::Indexer for Indexer {
	type Id = GithubRepoId;

	async fn index(&self, repo_id: GithubRepoId) -> Result<Vec<GithubEvent>> {
		let filters = GithubServiceIssueFilters {
			updated_since: None, // TODO
			..Default::default()
		};

		let events = self
			.github_fetch_service
			.issues_by_repo_id(&repo_id, &filters)
			.await
			.ignore_non_fatal_errors()?
			.into_iter()
			.map(GithubEvent::Issue)
			.collect();

		Ok(events)
	}
}
