use crate::utils::Cache;
use octocrab::models::User;
use std::{env, ops::Deref, time::Duration};

pub struct UserCache(Cache<String, User>);

fn ttl() -> Duration {
    if let Ok(ttl) = env::var("USER_CACHE_TTL") {
        if let Ok(ttl) = ttl.parse() {
            return Duration::from_secs(ttl);
        }
    }
    Duration::from_secs(5 * 60)
}

impl Default for UserCache {
    fn default() -> Self {
        Self(Cache::new(10_000, 1, ttl()))
    }
}

impl Deref for UserCache {
    type Target = Cache<String, User>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
