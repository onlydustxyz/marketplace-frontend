use anyhow::Result;
use dotenv::dotenv;
use marketplace_event_store::{Bus, Event};
use marketplace_infrastructure::logger;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	logger::set_default_global_logger().cancel_reset();

	let event_store_bus = Bus::default().await?;

	event_store_bus
		.consume(|data| async move {
			let event: Event = serde_json::from_slice(&data)?;
			println!(
				"[event-store] Received message: {}",
				serde_json::to_string_pretty(&event)?
			);
			Ok(())
		})
		.await?;

	Ok(())
}
