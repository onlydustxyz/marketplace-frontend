use crate::{Aggregate, Event};
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to connect to the event store")]
	Connection(#[source] anyhow::Error),
	#[error("Unable to list events from the store")]
	List(#[source] anyhow::Error),
}

#[automock]
pub trait Store<A: Aggregate>: Send + Sync {
	fn list_by_id(&self, aggregate_id: &A::Id) -> Result<Vec<Event>, Error>;
	fn list(&self) -> Result<Vec<Event>, Error>;
}
