/// Implementation of the `Publisher` trait for the `Bus` struct.
///
/// # Examples
///
/// ```
/// # use anyhow::Result;
/// # use async_trait::async_trait;
/// # use domain::{Destination, Message, Publisher, PublisherError};
/// # use super::Bus;
/// # #[async_trait]
/// # impl<M: Message + Send + Sync> Publisher<M> for Bus {
/// #     async fn publish(&self, destination: Destination, message: &M) -> Result<(), PublisherError> {
/// #         let (exchange_name, routing_key) = match destination {
/// #             Destination::Queue(name) => (String::new(), name),
/// #             Destination::Exchange(name) => (name, String::new()),
/// #         };
/// #         let confirmation = self
/// #             .publish(&exchange_name, &routing_key, &serde_json::to_vec(message)?)
/// #             .await
/// #             .map_err(|e| PublisherError::Send(anyhow!(e)))?;
/// #         match confirmation.is_nack() {
/// #             true => Err(PublisherError::Nack),
/// #             false => Ok(()),
/// #         }
/// #     }
/// # }
/// ```
#[async_trait]
impl<M: Message + Send + Sync> Publisher<M> for Bus {
    /// Publishes a message to a destination.
    ///
    /// # Arguments
    ///
    /// * `destination` - The destination where the message should be published to.
    /// * `message` - The message to be published.
    ///
    /// # Examples
    ///
    /// ```
    /// # async fn example() -> anyhow::Result<()> {
    /// # use domain::{Destination, Message, Publisher};
    /// # use super::Bus;
    /// # let bus = Bus::new()?;
    /// let destination = Destination::Queue("my_queue".to_string());
    /// let message = "Hello, world!";
    ///
    /// bus.publish(destination, &message).await?;
    /// # Ok(())
    /// # }
    /// ```
    async fn publish(&self, destination: Destination, message: &M) -> Result<(), PublisherError> {
        let (exchange_name, routing_key) = match destination {
            Destination::Queue(name) => (String::new(), name),
            Destination::Exchange(name) => (name, String::new()),
        };

        let confirmation = self
            .publish(&exchange_name, &routing_key, &serde_json::to_vec(message)?)
            .await
            .map_err(|e| PublisherError::Send(anyhow!(e)))?;

        match confirmation.is_nack() {
            true => Err(PublisherError::Nack),
            false => Ok(()),
        }
    }
}