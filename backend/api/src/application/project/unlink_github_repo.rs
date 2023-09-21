use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRepository, DomainError, Event, GithubRepoId, Project, ProjectId, Publisher,
};
use tracing::instrument;

use crate::domain::Publishable;

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<Event>>,
	project_repository: AggregateRepository<Project>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<Event>>,
		project_repository: AggregateRepository<Project>,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
		}
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn unlink_github_repo(
		&self,
		project_id: ProjectId,
		github_repo_id: GithubRepoId,
	) -> Result<(), DomainError> {
		let project = self.project_repository.find_by_id(&project_id)?;

		project
			.unlink_github_repo(github_repo_id)
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.map(Event::from)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(())
	}
}
