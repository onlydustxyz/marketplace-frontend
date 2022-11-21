use crate::Aggregate;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to connect to the event store")]
	Connection(#[source] anyhow::Error),
	#[error("Unable to list events from the store")]
	List(#[source] anyhow::Error),
}

pub trait Store<A: Aggregate>: Send + Sync {
	fn list_by_id(&self, aggregate_id: &A::Id) -> Result<Vec<A::Event>, Error>;
	fn list(&self) -> Result<Vec<A::Event>, Error>;
}
