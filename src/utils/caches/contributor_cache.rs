use std::{env, ops::Deref, time::Duration};

use crate::domain::{Contributor, ContributorId};

use super::Cache;

#[derive(Clone)]
pub struct ContributorCache(Cache<ContributorId, Contributor>);

fn ttl() -> Duration {
	if let Ok(ttl) = env::var("CONTRIBUTOR_CACHE_TTL") {
		if let Ok(ttl) = ttl.parse() {
			return Duration::from_secs(ttl);
		}
	}
	Duration::from_secs(7 * 24 * 3600) // one week
}

impl Default for ContributorCache {
	fn default() -> Self {
		Self(Cache::new(10_000, 1, ttl()))
	}
}

impl Deref for ContributorCache {
	type Target = Cache<ContributorId, Contributor>;

	fn deref(&self) -> &Self::Target {
		&self.0
	}
}
