use crate::domain::AggregateRootRepository;
use anyhow::Result;
use domain::{Destination, Event, Project, ProjectId, Publisher, UniqueMessage, UserId};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;
use std::sync::Arc;

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: Arc<AggregateRootRepository<Project>>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: Arc<AggregateRootRepository<Project>>,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
		}
	}

	pub async fn assign_leader(&self, project_id: ProjectId, leader_id: UserId) -> Result<UserId> {
		let project = self.project_repository.find_by_id(&project_id)?;

		let events: Vec<_> = project
			.assign_leader(leader_id)?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect();

		self.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(leader_id)
	}
}
