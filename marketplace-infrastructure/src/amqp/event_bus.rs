use super::{Error, EventBus};
use lapin::Connection;
use log::info;

pub async fn consumer() -> Result<EventBus, Error> {
	publisher().await?.with_queue("").await?.binded().await
}

pub async fn publisher() -> Result<EventBus, Error> {
	let connection = Connection::connect(&amqp_address()?, Default::default()).await?;
	info!("🔗 Event bus connected");
	EventBus::new(connection).await?.with_exchange("events").await
}

fn amqp_address() -> Result<String, Error> {
	let address = std::env::var("AMQP_ADDR")?;
	Ok(address)
}
