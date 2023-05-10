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

pub trait Stateful<Id> {
	fn store(&self, id: Id, events: &[GithubEvent]) -> anyhow::Result<()>;
}

pub fn hash<T: Hash>(t: &T) -> u64 {
	let mut s = DefaultHasher::new();
	t.hash(&mut s);
	s.finish()
}
