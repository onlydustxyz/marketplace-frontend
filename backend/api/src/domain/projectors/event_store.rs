use std::sync::Arc;

use derive_more::Constructor;
use domain::{Event, Publisher, PublisherError};

use crate::models::EventRepository;

#[derive(Constructor)]
pub struct Projector {
	events_repository: Arc<dyn EventRepository>,
}

#[async_trait]
impl Publisher<Event> for Projector {
	async fn publish(&self, event: &Event) -> Result<(), PublisherError> {
		self.events_repository
			.append(event.clone().try_into()?)
			.map_err(|e| PublisherError::Send(e.into()))?;
		Ok(())
	}
}
