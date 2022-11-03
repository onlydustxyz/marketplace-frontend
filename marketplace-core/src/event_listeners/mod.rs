use anyhow::Result;
use log::debug;
use marketplace_domain::{Event, Subscriber};

pub async fn main() -> Result<()> {
	use marketplace_infrastructure::event_bus;
	let event_consumer = event_bus::consumer().await?;

	event_consumer
		.subscribe(|event: Event| async move {
			if let Ok(event) = serde_json::to_string_pretty(&event) {
				debug!("[events] 📨 Received event: {}", &event);
			}

			Ok(())
		})
		.await?;

	Ok(())
}
