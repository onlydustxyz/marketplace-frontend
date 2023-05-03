use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchRepoService, NotInFilters};
use event_listeners::{
	domain::{GithubEvent, GithubRepoIndex},
	infrastructure::database::GithubUserIndexRepository,
};

use super::{error::IgnoreErrors, Result};

#[derive(new)]
pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
	github_user_index_repository: GithubUserIndexRepository,
}

#[async_trait]
impl super::Indexer for Indexer {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>> {
		let indexed_users = self
			.github_user_index_repository
			.list()?
			.iter()
			.map(|user| *user.user_id())
			.collect();

		let events = self
			.github_fetch_service
			.repo_contributors(repo_index.repo_id(), &NotInFilters::new(indexed_users))
			.await
			.ignore_non_fatal_errors()?
			.into_iter()
			.map(|contributor| GithubEvent::NewContributor(*contributor.id()))
			.collect();

		Ok(events)
	}
}
