use std::{fmt, sync::Arc, time::Duration};

use async_trait::async_trait;
use derive_new::new;
use olog::{error, warn, IntoField};

use super::{
	super::{error::Result, Indexer},
	service::{RateLimit, Service},
};
use crate::domain::indexers::Indexable;

#[derive(new)]
pub struct RateLimitedIndexer<I> {
	pub decorated: I,
	pub rate_limit_service: Arc<dyn Service>,
	pub guard: usize,
	pub github_rate_limit_retry_delay: Duration,
}

#[async_trait]
impl<Id, I> Indexer<Id> for RateLimitedIndexer<I>
where
	Id: Indexable,
	I: Indexer<Id>,
{
	type Output = ();

	async fn index(&self, id: &Id) -> Result<()> {
		self.sleep_if_needed().await;
		self.decorated.index(id).await?;
		Ok(())
	}
}

impl<I> RateLimitedIndexer<I> {
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

impl<I: fmt::Display> fmt::Display for RateLimitedIndexer<I> {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "RateLimited<{}>", self.decorated)
	}
}
