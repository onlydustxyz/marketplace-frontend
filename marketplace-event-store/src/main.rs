use anyhow::Result;
use dotenv::dotenv;
use futures::TryFutureExt;
use marketplace_domain::{Publisher, Subscriber};
use marketplace_event_store::{Event, EventBus as EventStoreBus};
use marketplace_infrastructure::{logger, EventBus};
use std::sync::Arc;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	logger::set_default_global_logger().cancel_reset();

	let event_store_bus = EventStoreBus::default().await?;
	let event_bus = Arc::new(EventBus::default().await?);

	event_store_bus
		.subscribe(|event| log(event).and_then(|event| publish(event, event_bus.clone())))
		.await?;

	Ok(())
}

async fn log(event: Event) -> Result<Event> {
	println!(
		"[event-store] Received message: {}",
		serde_json::to_string_pretty(&event)?
	);
	Ok(event)
}

async fn publish(event: Event, event_bus: Arc<EventBus>) -> Result<()> {
	event_bus.publish(event.event).await?;
	Ok(())
}
