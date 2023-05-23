use std::sync::Arc;

/// An error that can occur when using a repository.
#[derive(Debug, Error)]
pub enum Error {
    /// An aggregate was not found.
    #[error("Aggregate not found")]
    NotFound,
    /// An error occurred in the event store.
    #[error(transparent)]
    EventStoreError(#[from] EventStoreError),
}

/// A trait representing an aggregate root.
pub trait AggregateRoot: EventSourcable {}

/// A repository to store and retrieve aggregates.
#[derive(Clone)]
pub struct Repository<A: AggregateRoot> {
    /// The event store used by the repository.
    event_store: Arc<dyn EventStore<A>>,
}

#[cfg_attr(test, automock)]
impl<A: AggregateRoot + 'static> Repository<A> {
    /// Creates a new `Repository` with the given event store.
    pub fn new(event_store: Arc<dyn EventStore<A>>) -> Self {
        Self { event_store }
    }

    /// Finds an aggregate by its ID.
    ///
    /// Returns an error of type `Error::NotFound` if the aggregate is not found.
    pub fn find_by_id(&self, id: &A::Id) -> Result<A, Error> {
        let events = self.event_store.list_by_id(id)?;
        match events {
            _ if events.is_empty() => Err(Error::NotFound),
            events => Ok(A::from_events(&events)),
        }
    }
}