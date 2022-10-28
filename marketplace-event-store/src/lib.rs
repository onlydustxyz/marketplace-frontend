mod event;
pub use event::Event;

pub mod bus;

mod domain;
mod infrastructure;

use anyhow::Result;
use futures::TryFutureExt;
use log::debug;
use marketplace_domain::{Destination, Event as DomainEvent, Publisher, Subscriber};
use marketplace_infrastructure::{amqp::Bus, event_bus::EXCHANGE_NAME};
use std::sync::Arc;

pub async fn main() -> Result<()> {
	let inbound_event_bus = bus::consumer().await?;
	let outbound_event_bus = Arc::new(Bus::default().await?);

	inbound_event_bus
		.subscribe(|event| log(event).and_then(|event| publish(event, outbound_event_bus.clone())))
		.await?;

	Ok(())
}

async fn log(event: Event) -> Result<Event> {
	let res_pretty_event = serde_json::to_string_pretty(&event);
	if let Ok(pretty_event) = res_pretty_event {
		debug!("[event-store] 📨 Received event: {}", pretty_event);
	}
	Ok(event)
}

async fn publish(event: Event, publisher: Arc<dyn Publisher<DomainEvent>>) -> Result<()> {
	publisher
		.publish(Destination::exchange(EXCHANGE_NAME, ""), &event.event)
		.await?;
	Ok(())
}
