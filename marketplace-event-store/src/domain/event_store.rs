use crate::Event;
use marketplace_domain::Aggregate;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to connect to the event store")]
	Connection(#[source] anyhow::Error),
	#[error("Invalid event")]
	InvalidEvent(#[source] anyhow::Error),
	#[error("Unable to append event to the store")]
	Append(#[source] anyhow::Error),
}

pub trait EventStore<A: Aggregate> {
	fn append(&self, aggregate_id: &A::Id, events: Vec<Event>) -> Result<(), Error>;
}
