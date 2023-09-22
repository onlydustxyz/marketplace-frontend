use std::sync::Arc;

use derive_more::Constructor;
use domain::{Event, EventListener, SubscriberCallbackError};

use crate::models::EventRepository;

#[derive(Constructor)]
pub struct Projector {
	events_repository: Arc<dyn EventRepository>,
}

#[async_trait]
impl EventListener<Event> for Projector {
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		self.events_repository
			.append(event.try_into().map_err(SubscriberCallbackError::Fatal)?)
			.map_err(|e| SubscriberCallbackError::Fatal(e.into()))?;
		Ok(())
	}
}
