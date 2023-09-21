pub mod logger;
pub mod projections;
pub mod quote_syncer;
pub mod webhook;

use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use domain::{currencies, LogErr, MessagePayload, Subscriber, SubscriberCallbackError};
use infrastructure::{
	amqp::{CommandSubscriberDecorator, UniqueMessage},
	coinmarketcap, database, event_bus,
};
use olog::IntoField;
use tokio::task::JoinHandle;
use url::{ParseError, Url};
use webhook::EventWebHook;

use self::logger::Logger;
use crate::Config;

pub async fn bootstrap(config: Config) -> Result<Vec<JoinHandle<()>>> {
	let reqwest = reqwest::Client::new();
	let database = Arc::new(database::Client::new(database::init_pool(
		config.database.clone(),
	)?));
	let coinmarketcap = Arc::new(coinmarketcap::Client::new(
		config.coinmarketcap.clone(),
		currencies::USD,
	));

	spawn_all(config, reqwest, database, coinmarketcap).await
}

#[async_trait]
pub trait EventListener<E>: Send + Sync {
	async fn on_event(&self, event: E) -> Result<(), SubscriberCallbackError>;
}

pub async fn spawn_all(
	config: Config,
	reqwest: reqwest::Client,
	database: Arc<database::Client>,
	coinmarketcap: Arc<coinmarketcap::Client>,
) -> Result<Vec<JoinHandle<()>>> {
	let mut handles = vec![
		Logger.spawn(event_bus::event_consumer(config.amqp.clone(), "logger").await?),
		projections::Projector::new(
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
		)
		.spawn(
			event_bus::event_consumer(config.amqp.clone(), "projections")
				.await?
				.into_command_subscriber(database.clone()),
		),
		quote_syncer::Projector::new(database.clone(), coinmarketcap).spawn(
			event_bus::event_consumer(config.amqp.clone(), "quote_sync")
				.await?
				.into_command_subscriber(database.clone()),
		),
	];

	for (index, target) in webhook_targets().into_iter().enumerate() {
		handles.push(
			EventWebHook::new(reqwest.clone(), target).spawn(
				event_bus::event_consumer(config.amqp.clone(), format!("event-webhooks-{index}"))
					.await?,
			),
		)
	}

	Ok(handles)
}

pub trait Spawnable<E: MessagePayload + Send + Sync, S: Subscriber<UniqueMessage<E>> + Send + Sync>
{
	fn spawn(self, bus: S) -> JoinHandle<()>;
}

impl<
	E: MessagePayload + Send + Sync,
	S: Subscriber<UniqueMessage<E>> + Send + Sync + 'static,
	EL: EventListener<E> + 'static,
> Spawnable<E, S> for EL
{
	fn spawn(self, bus: S) -> JoinHandle<()> {
		let listener = Arc::new(self);
		tokio::spawn(async move {
			bus.subscribe(|message: UniqueMessage<E>| {
				notify_event_listener(listener.clone(), message.payload().clone())
			})
			.await
			.expect("Failed while trying to project received event");
		})
	}
}

async fn notify_event_listener<E>(
	listener: Arc<dyn EventListener<E>>,
	event: E,
) -> Result<(), SubscriberCallbackError> {
	listener.on_event(event).await.map_err(SubscriberCallbackError::from)
}

fn webhook_targets() -> Vec<Url> {
	std::env::var("EVENT_WEBHOOK_TARGET")
		.map(|targets| {
			targets
				.split(',')
				.filter_map(|target| {
					target
						.parse()
						.log_err(|e: &ParseError| {
							olog::error!(error = e.to_field(), "Invalid webhook target URL")
						})
						.ok()
				})
				.collect()
		})
		.unwrap_or_default()
}
