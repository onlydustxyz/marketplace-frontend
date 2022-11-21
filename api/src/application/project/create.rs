use anyhow::Result;
use std::sync::Arc;

use chrono::Utc;
use domain::{Destination, Project, ProjectId, Publisher, UuidGenerator};
use event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event, EventOrigin};

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<Event>>,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<Event>>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
		}
	}

	pub async fn create(&self, name: String) -> Result<ProjectId> {
		let project_id: ProjectId = self.uuid_generator.new_uuid().into();
		let events: Vec<Event> = Project::create(project_id, name)
			.into_iter()
			.map(|event| Event {
				deduplication_id: self.uuid_generator.new_uuid().to_string(),
				event: event.into(),
				timestamp: Utc::now().naive_utc(),
				origin: EventOrigin::BACKEND,
				metadata: Default::default(),
			})
			.collect();

		self.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(project_id)
	}
}
