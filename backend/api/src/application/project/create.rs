use std::sync::Arc;

use anyhow::Result;
use domain::{
	Amount, Budget, BudgetId, DomainError, Event, GithubRepoExists, GithubRepositoryId, Project,
	ProjectEvent, ProjectId, Publisher,
};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::{
	domain::{ProjectDetails, Publishable},
	infrastructure::database::ProjectDetailsRepository,
};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: ProjectDetailsRepository,
	github: Arc<dyn GithubRepoExists>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_details_repository: ProjectDetailsRepository,
		github: Arc<dyn GithubRepoExists>,
	) -> Self {
		Self {
			event_publisher,
			project_details_repository,
			github,
		}
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn create(
		&self,
		name: String,
		initial_budget: Amount,
		github_repo_id: GithubRepositoryId,
		description: Option<String>,
		telegram_link: Option<String>,
		logo_url: Option<String>,
	) -> Result<ProjectId, DomainError> {
		let project_id = ProjectId::new();

		Project::create(self.github.clone(), project_id, name, github_repo_id)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.chain(
				Budget::allocate(BudgetId::new(), initial_budget).into_iter().map(|event| {
					ProjectEvent::Budget {
						id: project_id,
						event,
					}
				}),
			)
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		self.project_details_repository.upsert(&ProjectDetails::new(
			project_id,
			description,
			telegram_link,
			logo_url,
		))?;

		Ok(project_id)
	}
}
