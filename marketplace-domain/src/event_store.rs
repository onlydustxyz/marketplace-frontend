use crate::{event::StorableEvent, Aggregate};
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to connect to the event store")]
	Connection,
	#[error("Invalid event")]
	InvalidEvent,
	#[error("Unable to append event to the store")]
	Append,
	#[error("Unable to list events from the store")]
	List,
}

#[automock]
pub trait Store<A: Aggregate>: Send + Sync {
	fn append(&self, aggregate_id: &A::Id, events: Vec<StorableEvent<A>>) -> Result<(), Error>;
	fn list_by_id(&self, aggregate_id: &A::Id) -> Result<Vec<A::Event>, Error>;
	fn list(&self) -> Result<Vec<A::Event>, Error>;
}
