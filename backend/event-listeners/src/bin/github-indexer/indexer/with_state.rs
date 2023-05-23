use std::marker::PhantomData;

use async_trait::async_trait;
use event_listeners::domain::{GithubEvent, Indexable};

use super::Result;

/// Wraps an indexer implementing the `Indexer` and `Stateful` traits, providing automatic storage 
/// of returned events in a persistent store.
pub struct Indexer<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> {
    indexer: I,
    _phantom: PhantomData<Id>,
}

#[async_trait]
impl<Id: Indexable + Sync, I: super::Indexer<Id> + super::Stateful<Id>> super::Indexer<Id> 
    for Indexer<Id, I>
{
    /// Indexes the given `id`, stores the resulting events, and returns them on success.
    async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
        let events = self.indexer.index(id).await?;
        self.indexer.store(id, &events)?;
        Ok(events)
    }
}

/// Extension trait for `Indexer`'s underlying indexer type, implementing the `WithState` method to 
/// wrap the indexer in an `Indexer` instance for automatic storage of returned events. 
pub trait WithState<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> {
    /// Wraps the underlying indexer in an `Indexer` instance for automatic storage of returned events.
    fn with_state(self) -> Indexer<Id, I>;
}

impl<Id: Indexable, I: super::Indexer<Id> + super::Stateful<Id>> WithState<Id, I> for I {
    /// Wraps the underlying indexer in an `Indexer` instance for automatic storage of returned events.
    fn with_state(self) -> Indexer<Id, I> {
        Indexer {
            indexer: self,
            _phantom: Default::default(),
        }
    }
}