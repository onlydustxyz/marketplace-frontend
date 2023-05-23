//! This module contains an implementation of an `Indexer` that wraps multiple indexers and runs them
//! in parallel using async-await.
//!
//! It also defines a `trait` called `Arced` that adds a convenience method `arced()` to all types
//! that implement `Sized`. This method returns a new `Arc` wrapping the value it is called on.
//!
//! # Examples
//!
//! ## Creating an `Indexer`
//!
//! ```
//! use event_listeners::domain::{Indexable, GithubEvent};
//! use std::sync::Arc;
//!
//! trait MyIndexer: super::Indexer<MyId> {}
//!
//! #[derive(Clone)]
//! struct MyId {
//!     value: u32,
//! }
//!
//! #[derive(new)]
//! struct MyIndexerImpl;
//!
//! #[async_trait::async_trait]
//! impl MyIndexer for MyIndexerImpl {
//!     async fn index(&self, _id: MyId) -> super::Result<Vec<GithubEvent>> {
//!         unimplemented!()
//!     }
//! }
//!
//! fn main() {
//!     let indexers: Vec<Arc<dyn MyIndexer>> = vec![MyIndexerImpl.arced()];
//!     let mult_indexer: super::Indexer<MyId> = super::Indexer::new(indexers);
//! }
//! ```
//!
//! ## Indexing using an `Indexer`
//!
//! ```
//! use event_listeners::domain::{Indexable, GithubEvent};
//! use std::sync::Arc;
//!
//! trait MyIndexer: super::Indexer<MyId> {}
//!
//! #[derive(Clone)]
//! struct MyId {
//!     value: u32,
//! }
//!
//! #[derive(new)]
//! struct MyIndexerImpl;
//!
//! #[async_trait::async_trait]
//! impl MyIndexer for MyIndexerImpl {
//!     async fn index(&self, _id: MyId) -> super::Result<Vec<GithubEvent>> {
//!         unimplemented!()
//!     }
//! }
//!
//! fn main() {
//!     let indexers: Vec<Arc<dyn MyIndexer>> = vec![MyIndexerImpl.arced()];
//!     let mult_indexer: super::Indexer<MyId> = super::Indexer::new(indexers);
//!
//!     let id = MyId { value: 42 };
//!     let result = mult_indexer.index(id).unwrap();
//!
//!     assert!(result.is_empty());
//! }
//! ```

use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use event_listeners::domain::{GithubEvent, Indexable};
use futures::future::try_join_all;

pub type Result<T> = anyhow::Result<T, anyhow::Error>;

/// This struct wraps multiple indexers and runs them in parallel using async-await.
#[derive(new)]
pub struct Indexer<Id: Indexable> {
    indexers: Vec<Arc<dyn super::Indexer<Id>>>,
}

#[async_trait]
impl<Id: Indexable + Sync> super::Indexer<Id> for Indexer<Id> {
    /// Runs the `id` through all the wrapped indexers and returns all the GitHub events they
    /// produce.
    async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
        let handles = self.indexers.iter().map(|indexer| indexer.index(id));
        Ok(try_join_all(handles).await?.into_iter().flatten().collect())
    }
}

/// This trait adds a convenience method `arced()` to all types that implement `Sized`. This method
/// returns a new `Arc` wrapping the value it is called on.
pub trait Arced
where
    Self: Sized,
{
    /// Returns a new `Arc` wrapping the value it is called on.
    fn arced(self) -> Arc<Self> {
        Arc::new(self)
    }
}

impl<T> Arced for T {}