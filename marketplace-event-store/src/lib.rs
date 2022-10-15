mod event;
pub use event::Event;

pub mod event_bus;

use anyhow::Result;
use futures::TryFutureExt;
use marketplace_domain::{Event as DomainEvent, Publisher, Subscriber};
use marketplace_infrastructure::amqp;
use std::sync::Arc;

pub async fn main() -> Result<()> {
	let event_store_bus = event_bus::consumer().await?;
	let event_bus = Arc::new(amqp::event_bus::publisher().await?);

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

async fn publish(event: Event, event_bus: Arc<dyn Publisher<DomainEvent>>) -> Result<()> {
	event_bus.publish("", &event.event).await?;
	Ok(())
}
