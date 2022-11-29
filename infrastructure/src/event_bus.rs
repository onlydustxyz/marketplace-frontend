use super::amqp::{Bus, BusError, ConsumableBus};
use lapin::options::QueueDeclareOptions;
use log::info;

pub const EXCHANGE_NAME: &str = "events";

pub async fn consumer(queue_name: &'static str) -> Result<ConsumableBus, BusError> {
	let bus = Bus::default()
		.await?
		.with_queue(
			queue_name,
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
		.await?
		.with_exchange(EXCHANGE_NAME)
		.await?;

	info!("[{queue_name}] 🎧 Start listening to events");
	Ok(bus)
}
