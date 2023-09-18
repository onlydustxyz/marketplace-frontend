use std::sync::Arc;

use anyhow::{anyhow, Result};
use domain::{
	AggregateRepository, DomainError, Event, GithubRepoId, Project, ProjectId, Publisher,
};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::domain::{GithubRepoExists, Publishable};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRepository<Project>,
	github_repo_exists: Arc<dyn GithubRepoExists>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRepository<Project>,
		github_repo_exists: Arc<dyn GithubRepoExists>,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
			github_repo_exists,
		}
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn link_github_repo(
		&self,
		project_id: ProjectId,
		github_repo_id: GithubRepoId,
	) -> Result<(), DomainError> {
		if !self
			.github_repo_exists
			.is_statified_by(github_repo_id)
			.await
			.map_err(DomainError::InternalError)?
		{
			return Err(DomainError::InvalidInputs(anyhow!(
				"Github repository {github_repo_id} does not exist"
			)));
		}

		let project = self.project_repository.find_by_id(&project_id)?;

		project
			.link_github_repo(github_repo_id)
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(())
	}
}
