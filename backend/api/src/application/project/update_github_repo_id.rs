use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRootRepository, DomainError, Event, GithubRepoExists, GithubRepositoryId, Project,
	ProjectId, Publisher,
};
use infrastructure::amqp::UniqueMessage;

use crate::domain::Publishable;

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
	github: Arc<dyn GithubRepoExists>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRootRepository<Project>,
		github: Arc<dyn GithubRepoExists>,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
			github,
		}
	}

	pub async fn update_project_github_repo_id(
		&self,
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
	) -> Result<ProjectId, DomainError> {
		let project = self.project_repository.find_by_id(&project_id)?;

		let events = project
			.update_github_repository(self.github.clone(), github_repo_id)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?;

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
