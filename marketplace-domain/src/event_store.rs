use crate::AggregateRoot;
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
pub trait Store<A: AggregateRoot>: Send + Sync {
	fn append(&self, aggregate_id: &A::Id, events: Vec<A::Event>) -> Result<(), Error>;
	fn list_by_id(&self, aggregate_id: &A::Id) -> Result<Vec<A::Event>, Error>;
}
