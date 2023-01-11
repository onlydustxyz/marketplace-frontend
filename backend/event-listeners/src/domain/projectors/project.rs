use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, GithubRepositoryId, PaymentEvent, ProjectEvent, SubscriberCallbackError};
use infrastructure::database::MappingRepository;
use tracing::instrument;

use crate::{
	domain::{projections::Project, EventListener, GithubService, GithubServiceError},
	infrastructure::database::{
		BudgetRepository, GithubRepoDetailsRepository, ProjectLeadRepository, ProjectRepository,
		UpdateGitubRepoIdChangeset,
	},
};

pub struct Projector {
	project_repository: ProjectRepository,
	project_lead_repository: ProjectLeadRepository,
	github_service: Arc<dyn GithubService>,
	github_repo_details_repository: GithubRepoDetailsRepository,
	budget_repository: BudgetRepository,
}

impl Projector {
	pub fn new(
		project_repository: ProjectRepository,
		project_lead_repository: ProjectLeadRepository,
		github_service: Arc<dyn GithubService>,
		github_repo_details_repository: GithubRepoDetailsRepository,
		budget_repository: BudgetRepository,
	) -> Self {
		Self {
			project_repository,
			project_lead_repository,
			github_service,
			github_repo_details_repository,
			budget_repository,
		}
	}

	#[instrument(skip(self))]
	async fn project_github_data(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<(), SubscriberCallbackError> {
		let repo = self.github_service.fetch_repository_details(github_repo_id).await.map_err(
			|e| match e {
				GithubServiceError::NotFound(error)
				| GithubServiceError::MissingRepositoryOwner(error) => SubscriberCallbackError::Discard(error),
				GithubServiceError::Other(error) => SubscriberCallbackError::Fatal(error),
			},
		)?;

		self.github_repo_details_repository.upsert(&repo)?;

		Ok(())
	}
}

#[async_trait]
impl EventListener for Projector {
	#[instrument(name = "project_projection", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		match event {
			Event::Project(event) => match event {
				ProjectEvent::Created {
					id,
					name,
					github_repo_id,
				} => {
					self.project_repository.insert(&Project::new(
						*id,
						name.to_owned(),
						(*github_repo_id).into(),
						0,
					))?;
					self.project_github_data(github_repo_id).await?;
				},
				ProjectEvent::LeaderAssigned { id, leader_id } =>
					self.project_lead_repository.insert(id, leader_id)?,
				ProjectEvent::LeaderUnassigned { id, leader_id } =>
					self.project_lead_repository.delete(id, leader_id)?,
				ProjectEvent::GithubRepositoryUpdated { id, github_repo_id } => {
					self.project_repository
						.update(id, UpdateGitubRepoIdChangeset::new(*github_repo_id))?;
					self.project_github_data(github_repo_id).await?;
				},
				ProjectEvent::Budget { .. } => (),
			},
			Event::Payment(event) => match event {
				PaymentEvent::Requested {
					budget_id,
					amount_in_usd,
					..
				} => {
					let budget = self.budget_repository.find_by_id(budget_id)?;
					if let Some(project_id) = budget.project_id() {
						let mut project = self.project_repository.find_by_id(project_id)?;
						project.total_spent_amount_in_usd += *amount_in_usd as i64;
						self.project_repository.update(project_id, project)?;
					}
				},
				PaymentEvent::Processed { .. } => (),
			},
		}

		Ok(())
	}
}
