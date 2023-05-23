/// A collection of modules representing different aspects of the event listeners domain.
pub mod composite;
pub mod guarded;
pub mod issues;
pub mod logged;
pub mod published;
pub mod repo;
pub mod user;
pub mod with_state;

use std::{
    collections::hash_map::DefaultHasher,
    hash::{Hash, Hasher},
};

use event_listeners::domain::{GithubEvent, IgnoreIndexerErrors, Indexer, IndexerResult as Result};

/// A trait implemented by types that can store events with an associated ID.
pub trait Stateful<Id> {
    /// Stores a collection of `GithubEvent`s with the specified `id`.
    fn store(&self, id: Id, events: &[GithubEvent]) -> anyhow::Result<()>;
}

/// Computes a hash value for the given value.
pub fn hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}