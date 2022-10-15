use super::{Error, EventBus};
use lapin::options::QueueDeclareOptions;
use log::info;

pub async fn consumer() -> Result<EventBus, Error> {
	publisher()
		.await?
		.with_queue(
			"",
			QueueDeclareOptions {
				exclusive: true, // only one consumer on this queue
				..Default::default()
			},
		)
		.await?
		.binded()
		.await
}

pub async fn publisher() -> Result<EventBus, Error> {
	let event_bus = EventBus::default().await?.with_exchange("events").await?;
	info!("🔗 Event bus connected");
	Ok(event_bus)
}
