use std::sync::Arc;

use ::olog::info;
use anyhow::Result;
use backend_domain::{
	Destination, Event, Publisher, Subscriber, SubscriberCallbackError, UniqueMessage,
};
use backend_infrastructure::{
	amqp::{self, Bus},
	config,
	database::{self, init_pool, Client as DatabaseClient},
	event_bus::EXCHANGE_NAME,
	tracing::{self, Tracer},
};
use dotenv::dotenv;
use event_store::{bus, domain::EventStore};
use futures::TryFutureExt;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct Config {
	database: database::Config,
	amqp: amqp::Config,
	tracer: tracing::Config,
}

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/event-store/app.yaml")?;
	let _tracer = Tracer::init(&config.tracer, "event_store")?;

	let inbound_event_bus = bus::consumer(&config.amqp).await?;
	let outbound_event_bus = Arc::new(Bus::default(&config.amqp).await?);
	let database = Arc::new(DatabaseClient::new(init_pool(&config.database)?));

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
	info!(message = message.to_string(), "📨 Received event");
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
			Event::Project(event) => match event {
				backend_domain::ProjectEvent::Created { id, .. }
				| backend_domain::ProjectEvent::LeaderAssigned { id, .. }
				| backend_domain::ProjectEvent::LeaderUnassigned { id, .. }
				| backend_domain::ProjectEvent::GithubRepositoryUpdated { id, .. }
				| backend_domain::ProjectEvent::Budget { id, .. } => id.to_string(),
			},
			Event::Payment(event) => match event {
				backend_domain::PaymentEvent::Requested { id, .. }
				| backend_domain::PaymentEvent::Processed { id, .. } => id.to_string(),
			},
		}
	}
}
