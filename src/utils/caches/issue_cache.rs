use crate::domain::ContributionId;
use octocrab::models::issues::Issue;
use std::{env, ops::Deref, time::Duration};

use super::Cache;

#[derive(Clone)]
pub struct IssueCache(Cache<ContributionId, Issue>);

fn ttl() -> Duration {
	if let Ok(ttl) = env::var("ISSUE_CACHE_TTL") {
		if let Ok(ttl) = ttl.parse() {
			return Duration::from_secs(ttl);
		}
	}
	Duration::from_secs(5 * 60)
}

impl Default for IssueCache {
	fn default() -> Self {
		Self(Cache::new(10_000, 1, ttl()))
	}
}

impl Deref for IssueCache {
	type Target = Cache<ContributionId, Issue>;

	fn deref(&self) -> &Self::Target {
		&self.0
	}
}
