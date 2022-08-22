use super::Aggregate;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to connect to the event store")]
	Connection,
	#[error("Invalid event")]
	InvalidEvent,
	#[error("Unable to append event to the store")]
	Append,
}

pub trait Store<A: Aggregate> {
	fn append(&self, aggregate_id: &A::Id, events: &[A::Event]) -> Result<(), Error>;
}
