/// This module defines an implementation for an `Indexer` with logging capabilities.
use std::marker::PhantomData;

use async_trait::async_trait;
use event_listeners::domain::{GithubEvent, Indexable};
use olog::info;

use super::{Result, Stateful};

/// `Indexer` with logging capabilities.
pub struct Indexer<Id: Indexable, I: super::Indexer<Id>> {
    indexer: I,
    _phantom: PhantomData<Id>,
}

#[async_trait]
impl<Id: Indexable + Sync, I: super::Indexer<Id>> super::Indexer<Id> for Indexer<Id, I> {
    /// Indexes an entity by ID and returns any `GithubEvent`s that were captured.
    ///
    /// Logs the number of `GithubEvent`s captured when indexing the entity.
    async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
        let events = self.indexer.index(id).await?;

        info!("Found {} events when indexing entity {id}", events.len(),);

        Ok(events)
    }
}

/// Trait extension for `Indexer` to add logging capabilities.
pub trait Logged<Id: Indexable, I: super::Indexer<Id>> {
    /// Chains an `Indexer` with the logging capability.
    fn logged(self) -> Indexer<Id, I>;
}

impl<Id: Indexable, I: super::Indexer<Id>> Logged<Id, I> for I {
    /// Chains an `Indexer` with the logging capability.
    fn logged(self) -> Indexer<Id, I> {
        Indexer {
            indexer: self,
            _phantom: Default::default(),
        }
    }
}

impl<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> Stateful<Id> for Indexer<Id, I> {
    /// Stores the captured `GithubEvent`s for an entity with the given ID.
    fn store(&self, id: Id, events: &[GithubEvent]) -> anyhow::Result<()> {
        self.indexer.store(id, events)
    }
}