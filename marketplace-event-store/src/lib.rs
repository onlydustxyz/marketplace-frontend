mod event;
pub use event::Event;

pub mod bus;

use anyhow::Result;
use futures::TryFutureExt;
use marketplace_domain::{Destination, Event as DomainEvent, Publisher, Subscriber};
use marketplace_infrastructure::{amqp::Bus, event_bus::EXCHANGE_NAME};
use std::sync::Arc;

pub async fn main() -> Result<()> {
	let input_bus = bus::consumer().await?;
	let output_bus = Arc::new(Bus::default().await?);

	input_bus
		.subscribe(|event| log(event).and_then(|event| publish(event, output_bus.clone())))
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
	event_bus
		.publish(Destination::exchange(EXCHANGE_NAME, ""), &event.event)
		.await?;
	Ok(())
}
