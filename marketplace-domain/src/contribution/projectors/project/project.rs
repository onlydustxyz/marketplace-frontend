use crate::*;
use async_trait::async_trait;
use log::error;
use std::sync::Arc;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	GithubRepo(#[from] GithubClientError),
	#[error(transparent)]
	ProjectProjectionRepository(#[from] ProjectProjectionRepositoryError),
}

pub struct ProjectProjector {
	github_client: Arc<dyn GithubClient>,
	project_projection_repository: Arc<dyn ProjectProjectionRepository>,
}

impl ProjectProjector {
	pub fn new(
		github_client: Arc<dyn GithubClient>,
		project_projection_repository: Arc<dyn ProjectProjectionRepository>,
	) -> Self {
		Self {
			github_client,
			project_projection_repository,
		}
	}

	async fn on_contribution_created(&self, project_id: GithubProjectId) -> Result<(), Error> {
		if self.project_projection_repository.find_by_id(project_id).is_err() {
			let repo = self.github_client.find_repository_by_id(project_id).await?;
			self.project_projection_repository.insert(ProjectProjection {
				id: repo.project_id,
				owner: repo.owner,
				name: repo.name,
				description: repo.description,
				url: repo.url,
				logo_url: repo.logo_url,
			})?;
		}
		Ok(())
	}
}

#[async_trait]
impl EventListener for ProjectProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Contribution(contribution_event) => match contribution_event {
				ContributionEvent::Created {
					id: _,
					project_id,
					issue_number: _,
					gate: _,
				} => self.on_contribution_created(*project_id).await,
				_ => return,
			},
			Event::Project(_) | Event::Contributor(_) => return,
		};

		if let Err(error) = result {
			error!("Unable to project event {event}: {}", error.to_string());
		}
	}
}
