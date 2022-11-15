mod logger;
use logger::Logger;

mod webhook;
use webhook::EventWebHook;

use anyhow::Result;
use marketplace_domain::{
	ContributorWithGithubDataProjector, Event, EventListener, ProjectLeadProjector, Subscriber,
	SubscriberCallbackError,
};
use marketplace_infrastructure::{amqp::ConsumableBus, database, event_bus, github};
use std::sync::Arc;
use tokio::task::JoinHandle;

pub async fn spawn_all(
	database: Arc<database::Client>,
	github: Arc<github::Client>,
	reqwest: reqwest::Client,
) -> Result<Vec<JoinHandle<()>>> {
	let handles = [
		Logger.spawn(event_bus::consumer("logger").await?),
		ContributorWithGithubDataProjector::new(github, database.clone())
			.spawn(event_bus::consumer("github-contributor-projector").await?),
		ProjectLeadProjector::new(database.clone())
			.spawn(event_bus::consumer("project-lead-projector").await?),
		EventWebHook::new(reqwest).spawn(event_bus::consumer("event-webhooks").await?),
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
