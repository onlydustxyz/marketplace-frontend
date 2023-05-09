pub mod composite;
pub mod guarded;
pub mod logged;
pub mod published;
pub mod repo;
pub mod with_state;

use event_listeners::domain::{GithubEvent, IgnoreIndexerErrors, Indexer, IndexerResult as Result};

pub trait Stateful<Id> {
	fn store(&self, id: Id, events: &[GithubEvent]) -> anyhow::Result<()>;
}
