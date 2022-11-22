use domain::{Aggregate, Destination, Publisher, PublisherError};
use event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event};
use std::sync::Arc;
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

#[async_trait]
pub trait Publishable {
	async fn publish(&self, publisher: Arc<dyn Publisher<Event>>) -> Result<(), PublisherError>;
}

#[async_trait]
impl Publishable for Vec<Event> {
	async fn publish(&self, publisher: Arc<dyn Publisher<Event>>) -> Result<(), PublisherError> {
		publisher.publish_many(Destination::queue(EVENT_STORE_QUEUE), self).await?;
		Ok(())
	}
}
