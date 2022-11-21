use backend_infrastructure::amqp::{Bus, BusError, ConsumableBus};
use lapin::options::QueueDeclareOptions;
use log::info;

pub const QUEUE_NAME: &str = "event-store";

pub async fn consumer() -> Result<ConsumableBus, BusError> {
	let event_bus = Bus::default()
		.await?
		.with_queue(
			QUEUE_NAME,
			QueueDeclareOptions {
				durable: true,      // persist messages during restart
				exclusive: true,    // only one consumer on this queue
				auto_delete: false, // do not delete the queue at shutdown
				..Default::default()
			},
		)
		.await?;
	info!("[event-store] 🎧 Start listening to events");
	Ok(event_bus)
}
