use std::{sync::Arc, time::Duration};

use self::indexer::RateLimitedIndexer;
use super::Indexable;

mod indexer;
mod service;
use derive_new::new;
pub use service::Service as GithubRateLimitFetchService;

#[derive(new)]
pub struct RateLimitConf {
	github: Arc<dyn GithubRateLimitFetchService>,
	min_rate_limit: usize,
	github_rate_limit_retry_delay: usize,
}

pub trait RateLimited<Id: Indexable, I: super::Indexer<Id>> {
	fn rate_limited(self, guard: &RateLimitConf) -> RateLimitedIndexer<Id, I>;
}

impl<Id: Indexable, I: super::Indexer<Id>> RateLimited<Id, I> for I {
	fn rate_limited(self, guard: &RateLimitConf) -> RateLimitedIndexer<Id, I> {
		RateLimitedIndexer {
			decorated: self,
			rate_limit_service: guard.github.clone(),
			guard: guard.min_rate_limit,
			github_rate_limit_retry_delay: Duration::from_secs(
				guard.github_rate_limit_retry_delay as u64,
			),
			_phantom: Default::default(),
		}
	}
}
