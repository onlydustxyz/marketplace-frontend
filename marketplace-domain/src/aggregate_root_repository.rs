use std::sync::Arc;

use crate::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Aggregate not found")]
	NotFound,
	#[error(transparent)]
	EventStoreError(#[from] EventStoreError),
}

#[derive(Clone)]
pub struct Repository<A: AggregateRoot> {
	event_store: Arc<dyn EventStore<A>>,
}

impl<A: AggregateRoot> Repository<A> {
	pub fn new(event_store: Arc<dyn EventStore<A>>) -> Self {
		Self { event_store }
	}
}

impl<A: AggregateRoot> Repository<A> {
	pub fn find_by_id(&self, id: &A::Id) -> Result<A, Error> {
		let events = self.event_store.list_by_id(id)?;
		match events {
			_ if events.is_empty() => Err(Error::NotFound),
			events => Ok(A::from_events(&events)),
		}
	}
}
