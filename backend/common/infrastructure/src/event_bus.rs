/// This module provides functions for working with AMQP (Advanced Message Queueing Protocol).
use std::fmt::Display;

use lapin::options::QueueDeclareOptions;
use olog::info;

use super::amqp::{Bus, BusError, ConsumableBus};
use crate::amqp::Config;

/// The name of the exchange to use for events.
pub const EXCHANGE_NAME: &str = "events";

/// Consume events and return a `ConsumableBus` instance.
///
/// # Arguments
///
/// * `config` - An instance of `Config` struct representing the AMQP connection configuration.
/// * `queue_name` - Name of the queue to use.
///
/// # Returns
///
/// `Ok(ConsumableBus)` when successful, `Err(BusError)` otherwise.
pub async fn event_consumer<Q: ToString + Display>(
    config: &Config,
    queue_name: Q,
) -> Result<ConsumableBus, BusError> {
    consumer_with_exchange(config, EXCHANGE_NAME, queue_name).await
}

/// Consume events and return a `ConsumableBus` instance with a specified exchange.
///
/// # Arguments
///
/// * `config` - An instance of `Config` struct representing the AMQP connection configuration.
/// * `exchange_name` - Name of the exchange to use.
/// * `queue_name` - Name of the queue to use.
///
/// # Returns
///
/// `Ok(ConsumableBus)` when successful, `Err(BusError)` otherwise.
pub async fn consumer_with_exchange<Q: ToString + Display>(
    config: &Config,
    exchange_name: &'static str,
    queue_name: Q,
) -> Result<ConsumableBus, BusError> {
    consumer(config, queue_name)
        .await?
        .with_exchange(exchange_name)
        .await
}

/// Consume events and return a `ConsumableBus` instance.
///
/// # Arguments
///
/// * `config` - An instance of `Config` struct representing the AMQP connection configuration.
/// * `queue_name` - Name of the queue to use.
///
/// # Returns
///
/// `Ok(ConsumableBus)` when successful, `Err(BusError)` otherwise.
pub async fn consumer<Q: ToString + Display>(
    config: &Config,
    queue_name: Q,
) -> Result<ConsumableBus, BusError> {
    let bus = Bus::new(config)
        .await?
        .with_queue(
            queue_name.to_string(),
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

    info!("[{queue_name}] 🎧 Start listening to events");
    Ok(bus)
}