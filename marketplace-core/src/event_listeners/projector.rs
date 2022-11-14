use anyhow::Result;
use marketplace_domain::{Event, EventListener, Subscriber, SubscriberCallbackError};
use marketplace_infrastructure::amqp::ConsumableBus;
use std::sync::Arc;
use tokio::task::JoinHandle;

async fn notify_event_listener(
	listener: Arc<dyn EventListener>,
	event: Event,
) -> Result<(), SubscriberCallbackError> {
	listener.on_event(&event).await;
	Ok(())
}

pub fn spawn(bus: ConsumableBus, listener: Arc<dyn EventListener>) -> JoinHandle<()> {
	tokio::spawn(async move {
		bus.subscribe(|event: Event| notify_event_listener(listener.clone(), event))
			.await
			.expect("Failed while trying to project received event");
	})
}
