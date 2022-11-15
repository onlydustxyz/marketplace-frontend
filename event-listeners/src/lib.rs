use anyhow::Result;
use futures::future::try_join_all;
use marketplace_domain::{
	ContributorWithGithubDataProjector, Event, EventListener, ProjectLeadProjector, Subscriber,
	SubscriberCallbackError,
};
use marketplace_infrastructure::{
	amqp::ConsumableBus,
	database::{self, init_pool},
	event_bus,
	event_webhook::EventWebHook,
	github,
};
use std::sync::Arc;
use tokio::task::JoinHandle;

mod listeners;
use listeners::*;

pub async fn main() -> Result<()> {
	try_join_all(spawn_listeners().await?).await?;

	Ok(())
}

async fn spawn_listeners() -> Result<Vec<JoinHandle<()>>> {
	let database = Arc::new(database::Client::new(init_pool()?));
	let github = Arc::new(github::Client::new());
	let reqwest_client = reqwest::Client::new();

	let handles = [
		Logger.spawn(event_bus::consumer("logger").await?),
		ContributorWithGithubDataProjector::new(github, database.clone())
			.spawn(event_bus::consumer("github-contributor-projector").await?),
		ProjectLeadProjector::new(database.clone())
			.spawn(event_bus::consumer("project-lead-projector").await?),
		EventWebHook::new(reqwest_client).spawn(event_bus::consumer("event-webhooks").await?),
	];

	Ok(handles.into())
}

trait Spawnable {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()>;
}

impl<EL: EventListener + 'static> Spawnable for EL {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()> {
		let listener = Arc::new(self);
		tokio::spawn(async move {
			bus.subscribe(|event: Event| notify_event_listener(listener.clone(), event))
				.await
				.expect("Failed while trying to project received event");
		})
	}
}

async fn notify_event_listener(
	listener: Arc<dyn EventListener>,
	event: Event,
) -> Result<(), SubscriberCallbackError> {
	listener.on_event(&event).await;
	Ok(())
}
