use domain::{Destination, Message, Publisher, PublisherError};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;
use std::sync::Arc;

#[async_trait]
pub trait Publishable<M: Message> {
	async fn publish(&self, publisher: Arc<dyn Publisher<M>>) -> Result<(), PublisherError>;
}

#[async_trait]
impl<M: Message + Sync> Publishable<M> for Vec<M> {
	async fn publish(&self, publisher: Arc<dyn Publisher<M>>) -> Result<(), PublisherError> {
		publisher.publish_many(Destination::queue(EVENT_STORE_QUEUE), self).await?;
		Ok(())
	}
}
