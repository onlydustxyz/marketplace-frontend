use crate::{EventSourcable, EventStore, EventStoreError};
#[cfg(test)]
use mockall::automock;
use std::sync::Arc;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Aggregate not found")]
	NotFound,
	#[error(transparent)]
	EventStoreError(#[from] EventStoreError),
}

pub trait AggregateRoot: EventSourcable {}

#[derive(Clone)]
pub struct Repository<A: AggregateRoot> {
	event_store: Arc<dyn EventStore<A>>,
}

#[cfg_attr(test, automock)]
impl<A: AggregateRoot + 'static> Repository<A> {
	pub fn new(event_store: Arc<dyn EventStore<A>>) -> Self {
		Self { event_store }
	}

	pub fn find_by_id(&self, id: &A::Id) -> Result<A, Error> {
		let events = self.event_store.list_by_id(id)?;
		match events {
			_ if events.is_empty() => Err(Error::NotFound),
			events => Ok(A::from_events(&events)),
		}
	}
}
