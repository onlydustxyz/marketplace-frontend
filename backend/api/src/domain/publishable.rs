use std::sync::Arc;

use domain::{Destination, Message, Publisher, PublisherError};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;

/// A trait representing types that can be published.
#[async_trait]
pub trait Publishable<M: Message> {
    /// Publishes the message of type `M`.
    ///
    /// # Arguments
    ///
    /// * `publisher` - An `Arc` reference to a `Publisher<M>`.
    ///
    /// # Returns
    ///
    /// Returns `Ok(())` if the message is successfully published, or an `Err` of `PublisherError`
    /// if an error occurs while publishing the message.
    async fn publish(&self, publisher: Arc<dyn Publisher<M>>) -> Result<(), PublisherError>;
}

#[async_trait]
impl<M: Message + Sync + Send> Publishable<M> for Vec<M> {
    /// Publishes a vector of messages of type `M`.
    ///
    /// # Arguments
    ///
    /// * `publisher` - An `Arc` reference to a `Publisher<M>`.
    ///
    /// # Returns
    ///
    /// Returns `Ok(())` if all messages are successfully published, or an `Err` of `PublisherError`
    /// if an error occurs while publishing the messages.
    async fn publish(&self, publisher: Arc<dyn Publisher<M>>) -> Result<(), PublisherError> {
        publisher.publish_many(Destination::queue(EVENT_STORE_QUEUE), self).await?;
        Ok(())
    }
}