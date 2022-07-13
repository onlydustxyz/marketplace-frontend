use crate::utils::Cache;
use octocrab::models::Repository;
use std::{env, ops::Deref, time::Duration};

pub struct RepoCache(Cache<String, Repository>);

fn ttl() -> Duration {
    if let Ok(ttl) = env::var("REPO_CACHE_TTL") {
        if let Ok(ttl) = ttl.parse() {
            return Duration::from_secs(ttl);
        }
    }
    Duration::from_secs(5 * 60)
}

impl Default for RepoCache {
    fn default() -> Self {
        Self(Cache::new(10_000, 1, ttl()))
    }
}

impl Deref for RepoCache {
    type Target = Cache<String, Repository>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
