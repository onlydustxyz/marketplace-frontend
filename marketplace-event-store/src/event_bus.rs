use lapin::options::QueueDeclareOptions;
use log::info;
use marketplace_infrastructure::amqp::{Bus, ConsumableBus, Error as EventBusError};

pub const QUEUE_NAME: &str = "event-store";

pub async fn consumer() -> Result<ConsumableBus, EventBusError> {
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
	info!("🔗 Event store connected");
	Ok(event_bus)
}
