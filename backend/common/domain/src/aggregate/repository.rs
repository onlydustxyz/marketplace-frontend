use std::sync::Arc;

use derive_new::new;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

use crate::{EventSourcable, EventStore, EventStoreError};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Aggregate not found")]
	NotFound,
	#[error(transparent)]
	EventStoreError(#[from] EventStoreError),
}

/// Aggregate repository.
/// Builds an aggregate from its events by fetching all events from the event store
#[derive(Clone, new)]
pub struct Repository<A: EventSourcable> {
	event_store: Arc<dyn EventStore<A>>,
}

#[cfg_attr(test, automock)]
impl<A: EventSourcable + 'static> Repository<A> {
	/// Event source an aggregate from its events
	pub fn find_by_id(&self, id: &A::Id) -> Result<A, Error> {
		let events = self.event_store.list_by_id(id)?;
		match events {
			_ if events.is_empty() => Err(Error::NotFound),
			events => Ok(A::from_events(&events)),
		}
	}
}
