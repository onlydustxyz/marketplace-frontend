use lapin::options::QueueDeclareOptions;
use log::info;
use marketplace_infrastructure::amqp::{Error as EventBusError, EventBus};

pub const QUEUE_NAME: &str = "event-store";

pub async fn consumer() -> Result<EventBus, EventBusError> {
	let event_bus = EventBus::default()
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
