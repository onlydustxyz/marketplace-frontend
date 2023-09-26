use std::time::{Duration, SystemTime, UNIX_EPOCH};

use async_trait::async_trait;
use infrastructure::github;

use super::super::error::{Error, Result};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub struct RateLimit {
	pub reset_in: Duration,
	pub remaining: usize,
}

#[async_trait]
pub trait Service: Send + Sync {
	async fn get_rate_limit(&self) -> Result<RateLimit>;
}

#[async_trait]
impl Service for github::Client {
	async fn get_rate_limit(&self) -> Result<RateLimit> {
		let rate_limit =
			self.octocrab().ratelimit().get().await.map_err(|e| Error::Other(e.into()))?;

		let reset = UNIX_EPOCH + Duration::from_secs(rate_limit.rate.reset as u64);

		Ok(RateLimit {
			reset_in: reset
				.duration_since(SystemTime::now())
				.map_err(|e| Error::Other(e.into()))?,
			remaining: rate_limit.rate.remaining,
		})
	}
}
