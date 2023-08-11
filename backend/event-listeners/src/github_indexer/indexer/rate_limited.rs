use std::{
	marker::PhantomData,
	sync::Arc,
	time::{Duration, SystemTime, UNIX_EPOCH},
};

use async_trait::async_trait;
use infrastructure::github;
use olog::{error, warn, IntoField};

use super::{Error, Indexable, Result};
use crate::{github_indexer::sleep, listeners::github::Event as GithubEvent};

pub struct Indexer<Id: Indexable, I: super::Indexer<Id>> {
	indexer: I,
	github: Arc<github::Client>,
	guard: usize,
	_phantom: PhantomData<Id>,
}

impl<Id: Indexable, I: super::Indexer<Id>> Indexer<Id, I> {
	async fn rate_limit(&self) -> Result<RateLimit> {
		let rate_limit = self
			.github
			.octocrab()
			.ratelimit()
			.get()
			.await
			.map_err(|e| Error::Other(e.into()))?;

		let reset = UNIX_EPOCH + Duration::from_secs(rate_limit.rate.reset as u64);

		Ok(RateLimit {
			reset_in: reset
				.duration_since(SystemTime::now())
				.map_err(|e| Error::Other(e.into()))?,
			remaining: rate_limit.rate.remaining,
		})
	}

	async fn sleep_if_needed(&self) {
		match self.rate_limit().await {
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
				sleep().await;
			},
			_ => (),
		}
	}
}

#[async_trait]
impl<Id: Indexable + Sync, I: super::Indexer<Id>> super::Indexer<Id> for Indexer<Id, I> {
	fn name(&self) -> String {
		self.indexer.name()
	}

	async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
		self.sleep_if_needed().await;
		self.indexer.index(id).await
	}
}

pub trait RateLimited<Id: Indexable, I: super::Indexer<Id>> {
	fn rate_limited(self, github: Arc<github::Client>, guard: usize) -> Indexer<Id, I>;
}

impl<Id: Indexable, I: super::Indexer<Id>> RateLimited<Id, I> for I {
	fn rate_limited(self, github: Arc<github::Client>, guard: usize) -> Indexer<Id, I> {
		Indexer {
			indexer: self,
			github,
			guard,
			_phantom: Default::default(),
		}
	}
}

struct RateLimit {
	reset_in: Duration,
	remaining: usize,
}
