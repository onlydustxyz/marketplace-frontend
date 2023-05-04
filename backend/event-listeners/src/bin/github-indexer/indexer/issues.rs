use std::sync::Arc;

use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::{GithubFetchIssueService, GithubServiceIssueFilters};
use event_listeners::domain::{GithubEvent, GithubRepoIndex, IndexerState};

use super::{error::IgnoreErrors, Result};

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchIssueService>,
}

#[async_trait]
impl super::Indexer for Indexer {
	async fn index(
		&self,
		repo_index: GithubRepoIndex,
	) -> Result<(Vec<GithubEvent>, Option<IndexerState>)> {
		let filters = GithubServiceIssueFilters {
			updated_since: repo_index
				.last_indexed_time()
				.and_then(|datetime| datetime.and_local_timezone(Utc).latest()),
			..Default::default()
		};

		let events = self
			.github_fetch_service
			.issues_by_repo_id(repo_index.repo_id(), &filters)
			.await
			.ignore_non_fatal_errors()?
			.into_iter()
			.map(GithubEvent::Issue)
			.collect();

		Ok((events, None))
	}
}
