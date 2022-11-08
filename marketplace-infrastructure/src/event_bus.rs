use super::amqp::{Bus, BusError, ConsumableBus};
use lapin::options::QueueDeclareOptions;
use log::info;

pub const EXCHANGE_NAME: &str = "events";

pub async fn consumer() -> Result<ConsumableBus, BusError> {
	let bus = Bus::default()
		.await?
		.with_queue(
			"",
			QueueDeclareOptions {
				exclusive: true,    // only one consumer on this queue
				durable: true,      // persist messages
				auto_delete: false, // keep the queue during consumer restart
				..Default::default()
			},
		)
		.await?
		.with_exchange(EXCHANGE_NAME)
		.await?;

	info!("[events] 🎧 Start listening to events");
	Ok(bus)
}
