use crate::domain::Publishable;
use anyhow::Result;
use domain::{Project, ProjectId, Publisher, UuidGenerator};
use event_store::Event;
use std::sync::Arc;

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

		Project::create(project_id, name)?
			.into_iter()
			.map(Event::from)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(project_id)
	}
}
