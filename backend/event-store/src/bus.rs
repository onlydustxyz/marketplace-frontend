/// This module provides a function to set up a consumer to listen to events from an AMQP bus using the backend_infrastructure crate with the lapin AMQP client.
///
/// `QueueDeclareOptions` from lapin::options is used to customize the queue settings.
///
/// # Example
///
/// ```
/// use backend_infrastructure::amqp::{Config};
/// use my_app_module::consumer;
///
/// #[tokio::main]
/// async fn main() -> Result<(), Box<dyn std::error::Error>> {
///     let config = Config::from_env()?;
///     let bus = consumer(&config).await?;
///     bus.consume(|_delivery| {
///         // Do something with the received event
///     }).await?;
///     Ok(())
/// }
/// ```
pub mod my_app_module {
    use backend_infrastructure::amqp::{Bus, BusError, Config, ConsumableBus};
    use lapin::options::QueueDeclareOptions;
    use olog::info;

    /// The name of the queue where events are stored.
    pub const QUEUE_NAME: &str = "event-store";

    /// Set up a consumer to listen to events from the AMQP bus.
    ///
    /// # Arguments
    ///
    /// * `config` - A reference to the AMQP bus configuration.
    ///
    /// # Returns
    ///
    /// A `ConsumableBus` instance that allows to start consuming the events by calling `bus.consume()` method.
    ///
    /// # Errors
    ///
    /// Returns a `BusError` if the bus initialization or queue setup fails.
    ///
    /// # Example
    ///
    /// ```
    /// use backend_infrastructure::amqp::{Config};
    /// use my_app_module::consumer;
    ///
    /// #[tokio::main]
    /// async fn main() -> Result<(), Box<dyn std::error::Error>> {
    ///     let config = Config::from_env()?;
    ///     let bus = consumer(&config).await?;
    ///     bus.consume(|_delivery| {
    ///         // Do something with the received event
    ///     }).await?;
    ///     Ok(())
    /// }
    /// ```
    pub async fn consumer(config: &Config) -> Result<ConsumableBus, BusError> {
        let event_bus = Bus::new(config)
            .await?
            .with_queue(
                QUEUE_NAME.to_string(),
                QueueDeclareOptions {
                    // allows multiple connections to this queue, and do not delete the queue when
                    // connection is closed
                    exclusive: false,

                    // the queue will survive a broker restart
                    durable: true,

                    // do not delete the queue when the last consumer unsubscribes
                    auto_delete: false,
                    ..Default::default()
                },
            )
            .await?;
        info!(queue = QUEUE_NAME, "🎧 Start listening to events");
        Ok(event_bus)
    }
}