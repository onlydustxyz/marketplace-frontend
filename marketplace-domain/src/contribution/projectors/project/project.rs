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

	async fn on_contribution_created(&self, project_id: &GithubProjectId) -> Result<(), Error> {
		if self.project_projection_repository.find_by_id(project_id).is_err() {
			let repo = self.github_client.find_repository_by_id(project_id).await?;
			self.project_projection_repository.store(ProjectProjection::new(
				repo.project_id,
				repo.owner,
				repo.name,
			))?;
		}
		Ok(())
	}
}

#[async_trait]
impl Projector<Contribution> for ProjectProjector {
	async fn project(&self, event: &<Contribution as Aggregate>::Event) {
		let result = match event {
			ContributionEvent::Created {
				id: _,
				project_id,
				issue_number: _,
				gate: _,
			} => self.on_contribution_created(project_id).await,
			_ => Ok(()),
		};

		if let Err(error) = result {
			error!("Unable to project event {event}: {}", error.to_string());
		}
	}
}
