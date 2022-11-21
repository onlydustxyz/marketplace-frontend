use anyhow::Result;
use std::sync::Arc;
use uuid::Uuid;

use crate::domain::AggregateRootRepository;
use chrono::Utc;
use domain::{Destination, Project, ProjectId, Publisher, UuidGenerator};
use event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event, EventOrigin};

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<Event>>,
	project_repository: Arc<AggregateRootRepository<Project>>,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<Event>>,
		project_repository: Arc<AggregateRootRepository<Project>>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
			project_repository,
		}
	}

	pub async fn assign_leader(&self, project_id: ProjectId, leader_id: Uuid) -> Result<Uuid> {
		let project = self.project_repository.find_by_id(&project_id)?;

		let events: Vec<Event> = project
			.assign_leader(leader_id)?
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

		Ok(leader_id)
	}
}
