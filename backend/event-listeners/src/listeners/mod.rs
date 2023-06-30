pub mod budget;
pub mod github;
pub mod logger;
pub mod project;
pub mod webhook;

use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use domain::{LogErr, MessagePayload, Subscriber, SubscriberCallbackError};
use infrastructure::{
	amqp::{CommandSubscriberDecorator, UniqueMessage},
	database, event_bus,
	github::Client as GithubClient,
};
use tokio::task::JoinHandle;
use url::Url;
use webhook::EventWebHook;

use self::logger::Logger;
use crate::{Config, GITHUB_EVENTS_EXCHANGE};

#[async_trait]
pub trait EventListener<E>: Send + Sync {
	async fn on_event(&self, event: E) -> Result<(), SubscriberCallbackError>;
}

pub async fn spawn_all(
	config: &Config,
	reqwest: reqwest::Client,
	database: Arc<database::Client>,
	github: Arc<GithubClient>,
) -> Result<Vec<JoinHandle<()>>> {
	let mut handles = vec![
		Logger.spawn(event_bus::event_consumer(config.amqp(), "logger").await?),
		project::Projector::new(
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
		)
		.spawn(
			event_bus::event_consumer(config.amqp(), "projects")
				.await?
				.into_command_subscriber(database.clone()),
		),
		budget::Projector::new(
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
		)
		.spawn(
			event_bus::event_consumer(config.amqp(), "budgets")
				.await?
				.into_command_subscriber(database.clone()),
		),
		github::Projector::new(
			github,
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
		)
		.spawn(
			event_bus::consumer_with_exchange(
				config.amqp(),
				GITHUB_EVENTS_EXCHANGE,
				"github-events",
			)
			.await?,
		),
		Logger.spawn(
			event_bus::consumer_with_exchange(config.amqp(), GITHUB_EVENTS_EXCHANGE, "logger")
				.await?,
		),
	];

	for (index, target) in webhook_targets().into_iter().enumerate() {
		handles.push(EventWebHook::new(reqwest.clone(), target).spawn(
			event_bus::event_consumer(config.amqp(), format!("event-webhooks-{index}")).await?,
		))
	}

	Ok(handles)
}

trait Spawnable<E: MessagePayload + Send + Sync, S: Subscriber<UniqueMessage<E>> + Send + Sync> {
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
				.filter_map(|target| target.parse().log_err("Invalid webhook target URL").ok())
				.collect()
		})
		.unwrap_or_default()
}
