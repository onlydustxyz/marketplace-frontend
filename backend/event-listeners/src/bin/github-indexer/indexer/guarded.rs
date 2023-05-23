use std::{future::Future, marker::PhantomData};

use async_trait::async_trait;
use event_listeners::domain::{GithubEvent, Indexable};

use super::Result;

/// Wraps an `Indexer` object and applies a guard function to determine whether indexing should be performed.
pub struct Indexer<
    Id: Indexable,
    I: super::Indexer<Id>,
    Fut: Future<Output = bool>,
    F: Fn() -> Fut,
> {
    indexer: I,
    guard: F,
    _phantom: PhantomData<Id>,
}

#[async_trait]
impl<
        Id: Indexable + Sync,
        I: super::Indexer<Id>,
        Fut: Future<Output = bool> + Send,
        F: Fn() -> Fut + Send + Sync,
    > super::Indexer<Id> for Indexer<Id, I, Fut, F>
{
    /// Indexes the given ID if the guard function returns `true`, else returns an empty `Vec` of `GithubEvent`s.
    async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
        if (self.guard)().await {
            self.indexer.index(id).await
        } else {
            Ok(vec![])
        }
    }
}

/// Adds a guard function to an `Indexer` object.
pub trait Guarded<Id: Indexable, I: super::Indexer<Id>> {
    fn guarded<Fut: Future<Output = bool>, F: Fn() -> Fut>(
        self,
        guard: F,
    ) -> Indexer<Id, I, Fut, F>;
}

impl<Id: Indexable, I: super::Indexer<Id>> Guarded<Id, I> for I {
    /// Wraps the given `Indexer` object and adds a guard function to determine whether indexing should be performed.
    fn guarded<Fut: Future<Output = bool>, F: Fn() -> Fut>(
        self,
        guard: F,
    ) -> Indexer<Id, I, Fut, F> {
        Indexer {
            indexer: self,
            guard,
            _phantom: Default::default(),
        }
    }
}