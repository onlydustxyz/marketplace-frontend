use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{stream_filter, GithubFetchRepoService, GithubUser};
use event_listeners::{
	domain::{GithubEvent, GithubRepoIndex},
	infrastructure::database::GithubUserIndexRepository,
};

use super::{IgnoreIndexerErrors, Result};

pub struct Indexer {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
	not_in_user_index_filter: Arc<NotInUserIndexFilter>,
}

impl Indexer {
	pub fn new(
		github_fetch_service: Arc<dyn GithubFetchRepoService>,
		github_user_index_repository: GithubUserIndexRepository,
	) -> Self {
		Self {
			github_fetch_service,
			not_in_user_index_filter: Arc::new(NotInUserIndexFilter::new(
				github_user_index_repository,
			)),
		}
	}
}

#[async_trait]
impl super::Indexer for Indexer {
	async fn index(&self, repo_index: GithubRepoIndex) -> Result<Vec<GithubEvent>> {
		let events = self
			.github_fetch_service
			.repo_contributors(repo_index.repo_id(), self.not_in_user_index_filter.clone())
			.await
			.ignore_non_fatal_errors()?
			.into_iter()
			.map(GithubEvent::User)
			.collect();

		Ok(events)
	}
}

#[derive(new)]
struct NotInUserIndexFilter {
	github_user_index_repository: GithubUserIndexRepository,
}

impl stream_filter::Filter for NotInUserIndexFilter {
	type I = GithubUser;

	fn filter(&self, item: GithubUser) -> stream_filter::Decision<GithubUser> {
		if self.github_user_index_repository.exists(item.id()).unwrap_or(false) {
			stream_filter::Decision::Skip
		} else {
			stream_filter::Decision::Take(item)
		}
	}
}
