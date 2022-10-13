mod event;
pub use event::Event;

mod event_bus;
pub use event_bus::EventBus;

use anyhow::Result;
use futures::TryFutureExt;
use marketplace_domain::{Publisher, Subscriber};
use marketplace_infrastructure::EventBus as DomainEventBus;
use std::sync::Arc;

pub async fn main() -> Result<()> {
	let event_store_bus = EventBus::default().await?;
	let event_bus = Arc::new(DomainEventBus::default().await?);

	event_store_bus
		.subscribe(|event| log(event).and_then(|event| publish(event, event_bus.clone())))
		.await?;

	Ok(())
}

async fn log(event: Event) -> Result<Event> {
	println!(
		"[event-store] ✉️ Received message: {}",
		serde_json::to_string_pretty(&event)?
	);
	Ok(event)
}

async fn publish(event: Event, event_bus: Arc<DomainEventBus>) -> Result<()> {
	event_bus.publish(event.event).await?;
	Ok(())
}
