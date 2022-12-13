use std::sync::Arc;

use anyhow::Result;

use domain::{
	AggregateRootRepository, Event, GithubRepositoryId, Project, ProjectId, Publisher,
	UniqueMessage,
};

use crate::domain::Publishable;

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRootRepository<Project>,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
		}
	}

	pub async fn update_project_github_repo_id(
		&self,
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
	) -> Result<ProjectId> {
		let project = self.project_repository.find_by_id(&project_id)?;

		let events = project.update_github_repository(github_repo_id)?;

		events
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(project_id)
	}
}
