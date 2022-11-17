mod event;
pub use event::{Event, Origin as EventOrigin};

pub mod bus;

mod domain;
mod infrastructure;

use anyhow::Result;
use backend_domain::{
	Destination, Event as DomainEvent, Publisher, Subscriber, SubscriberCallbackError,
};
use backend_infrastructure::{
	amqp::Bus,
	database::{init_pool, Client as DatabaseClient},
	event_bus::EXCHANGE_NAME,
};
use domain::EventStore;
use futures::TryFutureExt;
use log::debug;
use std::sync::Arc;

pub async fn main() -> Result<()> {
	let inbound_event_bus = bus::consumer().await?;
	let outbound_event_bus = Arc::new(Bus::default().await?);
	let database = Arc::new(DatabaseClient::new(init_pool()?));

	inbound_event_bus
		.subscribe(|event| {
			store(database.clone(), event)
				.and_then(|event| publish(event, outbound_event_bus.clone()))
		})
		.await?;

	Ok(())
}

async fn store(store: Arc<dyn EventStore>, event: Event) -> Result<Event, SubscriberCallbackError> {
	if let Ok(pretty_event) = serde_json::to_string_pretty(&event) {
		debug!("[event-store] 📨 Received event: {}", pretty_event);
	}

	store
		.append(&event.aggregate_id(), event.clone())
		.map_err(|e| SubscriberCallbackError::Fatal(e.into()))?;

	Ok(event)
}

async fn publish(
	event: Event,
	publisher: Arc<dyn Publisher<DomainEvent>>,
) -> Result<(), SubscriberCallbackError> {
	publisher
		.publish(Destination::exchange(EXCHANGE_NAME), &event.event)
		.await
		.map_err(|e| SubscriberCallbackError::Fatal(e.into()))?;
	Ok(())
}

// TODO: remove once events are type safe
trait IdentifiableAggregate {
	fn aggregate_id(&self) -> String;
}

impl IdentifiableAggregate for Event {
	fn aggregate_id(&self) -> String {
		match &self.event {
			DomainEvent::Project(_) => unimplemented!("No project event yet"),
			DomainEvent::Payment(event) => match event {
				backend_domain::PaymentEvent::Created { id, .. } => id.to_string(),
			},
		}
	}
}
