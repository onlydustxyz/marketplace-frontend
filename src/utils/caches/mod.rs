mod contributor_cache;
mod issue_cache;
mod repo_cache;

pub use contributor_cache::ContributorCache;
pub use issue_cache::IssueCache;
pub use repo_cache::RepoCache;

use std::{hash::Hash, time::Duration};

use futures::Future;
use log::error;
use stretto::AsyncCacheBuilder;

#[derive(Clone)]
pub struct Cache<KEY, VALUE>
where
	KEY: Hash + Eq,
	VALUE: Send + Sync + 'static,
{
	cache: stretto::AsyncCache<KEY, Option<VALUE>>,
	cost: i64,
	ttl: Duration,
}

impl<KEY, VALUE> Cache<KEY, VALUE>
where
	KEY: Hash + Eq + Clone,
	VALUE: Send + Sync + Clone + 'static,
{
	pub fn new(max_cost: i64, cost: i64, ttl: Duration) -> Self {
		Self {
			cache: AsyncCacheBuilder::new(10 * max_cost as usize, max_cost)
				.set_ignore_internal_cost(true)
				.finalize(tokio::spawn)
				.unwrap(),
			cost,
			ttl,
		}
	}

	pub async fn get_or_insert<Fut>(&self, key: &KEY, callback: impl Fn() -> Fut) -> Option<VALUE>
	where
		Fut: Future<Output = Option<VALUE>>,
	{
		match self.cache.get(key) {
			Some(value) => value.value().clone(),
			None => {
				let value = callback().await;

				self.cache
					.insert_with_ttl(key.clone(), value.clone(), self.cost, self.ttl)
					.await;

				if let Err(error) = self.cache.wait().await {
					error!("{}", error);
				}

				value
			},
		}
	}
}
