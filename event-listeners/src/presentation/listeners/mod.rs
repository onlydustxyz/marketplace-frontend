mod logger;
use logger::Logger;

mod webhook;
use webhook::EventWebHook;

use crate::domain::*;
use anyhow::Result;
use domain::{Event, Subscriber, SubscriberCallbackError};
use infrastructure::{amqp::ConsumableBus, event_bus};
use std::sync::Arc;
use tokio::task::JoinHandle;

pub async fn spawn_all(reqwest: reqwest::Client) -> Result<Vec<JoinHandle<()>>> {
	let handles = [
		Logger.spawn(event_bus::consumer("logger").await?),
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
	listener.on_event(&event).await.map_err(SubscriberCallbackError::Fatal)
}
