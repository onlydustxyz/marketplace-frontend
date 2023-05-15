use std::fmt::Display;

use lapin::options::QueueDeclareOptions;
use olog::info;

use super::amqp::{Bus, BusError, ConsumableBus};
use crate::amqp::Config;

pub const EXCHANGE_NAME: &str = "events";

pub async fn event_consumer<Q: ToString + Display>(
	config: &Config,
	queue_name: Q,
) -> Result<ConsumableBus, BusError> {
	consumer_with_exchange(config, EXCHANGE_NAME, queue_name).await
}

pub async fn consumer_with_exchange<Q: ToString + Display>(
	config: &Config,
	exchange_name: &'static str,
	queue_name: Q,
) -> Result<ConsumableBus, BusError> {
	consumer(config, queue_name).await?.with_exchange(exchange_name).await
}

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
