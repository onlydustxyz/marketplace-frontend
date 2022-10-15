use super::{Bus, Error};
use lapin::options::QueueDeclareOptions;
use log::info;

pub const EXCHANGE_NAME: &str = "events";

pub async fn consumer() -> Result<Bus, Error> {
	let event_bus = Bus::default()
		.await?
		.with_exchange(EXCHANGE_NAME)
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
		.await?;
	info!("🔗 Event bus connected");
	Ok(event_bus)
}
