mod logger;
use logger::Logger;
use url::Url;

mod webhook;
use std::sync::Arc;

use anyhow::Result;
use domain::{LogErr, MessagePayload, Subscriber, SubscriberCallbackError};
use infrastructure::{
	amqp::{CommandSubscriberDecorator, UniqueMessage},
	database, event_bus, github,
};
use tokio::task::JoinHandle;
use webhook::EventWebHook;

use crate::{
	domain::*,
	infrastructure::database::{
		GithubIssuesRepository, ProjectGithubReposRepository, ProjectLeadRepository,
	},
	Config, GITHUB_EVENTS_EXCHANGE,
};

pub async fn spawn_all(
	config: &Config,
	reqwest: reqwest::Client,
	database: Arc<database::Client>,
	github: Arc<github::Client>,
) -> Result<Vec<JoinHandle<()>>> {
	let mut handles = vec![
		Logger.spawn(event_bus::event_consumer(config.amqp(), "logger").await?),
		ProjectProjector::new(
			database.clone(),
			ProjectLeadRepository::new(database.clone()),
			ProjectGithubReposRepository::new(database.clone()),
			database.clone(),
			database.clone(),
		)
		.spawn(
			event_bus::event_consumer(config.amqp(), "projects")
				.await?
				.into_command_subscriber(database.clone()),
		),
		BudgetProjector::new(
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
		GithubProjector::new(
			github,
			database.clone(),
			GithubIssuesRepository::new(database.clone()),
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
