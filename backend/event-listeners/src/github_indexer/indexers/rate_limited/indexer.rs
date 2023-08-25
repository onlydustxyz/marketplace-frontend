use std::{marker::PhantomData, sync::Arc, time::Duration};

use async_trait::async_trait;
use derive_new::new;
use olog::{error, warn, IntoField};

use super::{
	super::{error::Result, Indexable, Indexer},
	service::{RateLimit, Service},
};

#[derive(new)]
pub struct RateLimitedIndexer<Id, I>
where
	Id: Indexable,
	I: Indexer<Id>,
{
	pub decorated: I,
	pub rate_limit_service: Arc<dyn Service>,
	pub guard: usize,
	pub github_rate_limit_retry_delay: Duration,
	pub _phantom: PhantomData<Id>,
}

#[async_trait]
impl<Id, I> Indexer<Id> for RateLimitedIndexer<Id, I>
where
	Id: Indexable,
	I: Indexer<Id>,
{
	async fn index(&self, id: &Id) -> Result<()> {
		self.sleep_if_needed().await;
		self.decorated.index(id).await
	}
}

impl<Id, I> RateLimitedIndexer<Id, I>
where
	Id: Indexable,
	I: Indexer<Id>,
{
	async fn sleep_if_needed(&self) {
		match self.rate_limit_service.get_rate_limit().await {
			Ok(RateLimit {
				reset_in,
				remaining,
			}) if remaining < self.guard => {
				warn!(
					remaining = remaining,
					guard = self.guard,
					"Rate limit reached, sleeping for {} seconds",
					reset_in.as_secs()
				);
				tokio::time::sleep(reset_in).await;
			},
			Err(e) => {
				error!(
					error = e.to_field(),
					"Failed while checking github rate limit",
				);
				tokio::time::sleep(self.github_rate_limit_retry_delay).await;
			},
			_ => (),
		}
	}
}
