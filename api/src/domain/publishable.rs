use std::sync::Arc;

use domain::{Message, Publisher, PublisherError};

#[async_trait]
pub trait Publishable<M: Message> {
	async fn publish(&self, publisher: Arc<dyn Publisher<M>>) -> Result<(), PublisherError>;
}

#[async_trait]
impl<M: Message + Sync + Send> Publishable<M> for Vec<M> {
	async fn publish(&self, publisher: Arc<dyn Publisher<M>>) -> Result<(), PublisherError> {
		publisher.publish_many(self).await?;
		Ok(())
	}
}
