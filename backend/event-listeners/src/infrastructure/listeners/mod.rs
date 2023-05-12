mod logger;
use logger::Logger;

mod webhook;
use std::sync::Arc;

use anyhow::Result;
use domain::{MessagePayload, Subscriber, SubscriberCallbackError};
use infrastructure::{
	amqp::{ConsumableBus, UniqueMessage},
	database, event_bus, github,
};
use tokio::task::JoinHandle;
use webhook::EventWebHook;

use crate::{
	domain::*,
	infrastructure::database::{
		BudgetRepository, GithubIssuesRepository, GithubReposContributorsRepository,
		GithubReposRepository, GithubUsersRepository, PaymentRepository, PaymentRequestRepository,
		ProjectGithubReposRepository, ProjectLeadRepository, ProjectRepository, WorkItemRepository,
	},
	Config, GITHUB_EVENTS_EXCHANGE,
};

pub async fn spawn_all(
	config: &Config,
	reqwest: reqwest::Client,
	database: Arc<database::Client>,
	github: Arc<github::Client>,
) -> Result<Vec<JoinHandle<()>>> {
	let handles = [
		Logger.spawn(event_bus::event_consumer(config.amqp(), "logger").await?),
		EventWebHook::new(reqwest)
			.spawn(event_bus::event_consumer(config.amqp(), "event-webhooks").await?),
		ProjectProjector::new(
			ProjectRepository::new(database.clone()),
			ProjectLeadRepository::new(database.clone()),
			ProjectGithubReposRepository::new(database.clone()),
			database.clone(),
		)
		.spawn(event_bus::event_consumer(config.amqp(), "projects").await?),
		BudgetProjector::new(
			PaymentRequestRepository::new(database.clone()),
			PaymentRepository::new(database.clone()),
			BudgetRepository::new(database.clone()),
			WorkItemRepository::new(database.clone()),
			database.clone(),
			database.clone(),
		)
		.spawn(event_bus::event_consumer(config.amqp(), "budgets").await?),
		GithubProjector::new(
			github,
			GithubReposRepository::new(database.clone()),
			GithubIssuesRepository::new(database.clone()),
			GithubUsersRepository::new(database.clone()),
			GithubReposContributorsRepository::new(database.clone()),
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

	Ok(handles.into())
}

trait Spawnable<E: MessagePayload> {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()>;
}

impl<E: MessagePayload + Send + Sync, EL: EventListener<E> + 'static> Spawnable<E> for EL {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()> {
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
	listener.on_event(&event).await.map_err(SubscriberCallbackError::from)
}
