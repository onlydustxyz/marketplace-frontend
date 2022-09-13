use crate::{event::StorableEvent, Aggregate, Event};
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to connect to the event store")]
	Connection(#[source] anyhow::Error),
	#[error("Invalid event")]
	InvalidEvent(#[source] anyhow::Error),
	#[error("Unable to append event to the store")]
	Append(#[source] anyhow::Error),
	#[error("Unable to list events from the store")]
	List(#[source] anyhow::Error),
}

#[automock]
pub trait Store<A: Aggregate>: Send + Sync {
	fn append(&self, aggregate_id: &A::Id, events: Vec<StorableEvent<A>>) -> Result<(), Error>;
	fn list_by_id(&self, aggregate_id: &A::Id) -> Result<Vec<Event>, Error>;
	fn list(&self) -> Result<Vec<Event>, Error>;
}
