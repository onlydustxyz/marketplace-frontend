pub mod bus;

mod domain;
mod infrastructure;

use anyhow::Result;
use backend_domain::{
	Destination, Event, Publisher, Subscriber, SubscriberCallbackError, UniqueMessage,
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

async fn store(
	store: Arc<dyn EventStore>,
	message: UniqueMessage<Event>,
) -> Result<UniqueMessage<Event>, SubscriberCallbackError> {
	if let Ok(pretty_event) = serde_json::to_string_pretty(&message) {
		debug!("[event-store] 📨 Received event: {}", pretty_event);
	}

	store
		.append(&message.payload().aggregate_id(), message.clone())
		.map_err(|e| SubscriberCallbackError::Fatal(e.into()))?;

	Ok(message)
}

async fn publish(
	message: UniqueMessage<Event>,
	publisher: Arc<dyn Publisher<Event>>,
) -> Result<(), SubscriberCallbackError> {
	publisher
		.publish(Destination::exchange(EXCHANGE_NAME), message.payload())
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
		match &self {
			Event::Project(_) => unimplemented!("No project event yet"),
			Event::Payment(event) => match event {
				backend_domain::PaymentEvent::Created { id, .. } => id.to_string(),
			},
			DomainEvent::PaymentRequest(event) => match event {
				backend_domain::PaymentRequestEvent::Created { id, .. } => id.to_string(),
			},
		}
	}
}
