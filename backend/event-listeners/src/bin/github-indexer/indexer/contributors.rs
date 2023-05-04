use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{contributor_stream_filter, GithubFetchRepoService, GithubRepoContributor};
use event_listeners::{
	domain::{GithubEvent, GithubRepoIndex},
	infrastructure::database::GithubUserIndexRepository,
};

use super::{error::IgnoreErrors, Result};

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
			.map(|contributor| GithubEvent::NewContributor(*contributor.id()))
			.collect();

		Ok(events)
	}
}

#[derive(new)]
struct NotInUserIndexFilter {
	github_user_index_repository: GithubUserIndexRepository,
}

impl contributor_stream_filter::Filter for NotInUserIndexFilter {
	fn filter(&self, item: GithubRepoContributor) -> contributor_stream_filter::Decision {
		match self.github_user_index_repository.find_by_id(item.id()) {
			Ok(_) => contributor_stream_filter::Decision::Skip,
			Err(_) => contributor_stream_filter::Decision::Take(item),
		}
	}
}
