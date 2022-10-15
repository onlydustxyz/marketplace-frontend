use crate::domain::{BlockchainObserver, ObservedEvent};
use async_trait::async_trait;
use log::error;
use marketplace_domain::{Destination, EventOrigin, Publisher};
use marketplace_event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event};

#[async_trait]
impl<P: Publisher<Event>> BlockchainObserver for P {
	async fn on_new_event(&self, observed_event: &ObservedEvent, _block_number: u64) {
		if let Err(error) = self
			.publish(
				Destination::queue(EVENT_STORE_QUEUE),
				&observed_event.clone().into(),
			)
			.await
		{
			error!(
				"Unable to publish event {}: {error}",
				observed_event.to_string()
			);
		}
	}
}

impl From<ObservedEvent> for Event {
	fn from(event: ObservedEvent) -> Self {
		Self {
			deduplication_id: event.deduplication_id,
			event: event.event,
			metadata: event.metadata,
			origin: EventOrigin::Starknet,
			timestamp: event.timestamp,
		}
	}
}
