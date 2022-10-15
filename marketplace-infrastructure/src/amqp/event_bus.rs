use super::{Bus, BusError, ConsumableBus};
use lapin::options::QueueDeclareOptions;
use log::info;

pub const EXCHANGE_NAME: &str = "events";

pub async fn consumer() -> Result<ConsumableBus, BusError> {
	let event_bus = Bus::default()
		.await?
		.with_queue(
			"",
			QueueDeclareOptions {
				exclusive: true, // only one consumer on this queue
				..Default::default()
			},
		)
		.await?
		.with_exchange(EXCHANGE_NAME)
		.await?;

	info!("🔗 Event bus connected");
	Ok(event_bus)
}
