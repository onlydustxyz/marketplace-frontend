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
	ContributorProjectionRepository(#[from] ContributorProjectionRepositoryError),
	#[error(transparent)]
	ContributorService(#[from] ContributorServiceError),
}

pub struct ContributorProjector {
	github_client: Arc<dyn GithubClient>,
	contributor_projection_repository: Arc<dyn ContributorProjectionRepository>,
	contributor_service: Arc<dyn ContributorService>,
}

impl ContributorProjector {
	pub fn new(
		github_client: Arc<dyn GithubClient>,
		contributor_projection_repository: Arc<dyn ContributorProjectionRepository>,
		contributor_service: Arc<dyn ContributorService>,
	) -> Self {
		Self {
			github_client,
			contributor_projection_repository,
			contributor_service,
		}
	}

	async fn on_contribution_assigned(&self, contributor_id: &ContributorId) -> Result<(), Error> {
		if self.contributor_projection_repository.find_by_id(&contributor_id).is_err() {
			let contributor = self.contributor_service.contributor_by_id(&contributor_id).await?;

			// TODO: make data received from on chain service mandatory
			let github_identifier: GithubUserId =
				contributor.github_handle.unwrap().parse().unwrap();

			let user = self.github_client.find_user_by_id(github_identifier).await?;

			self.contributor_projection_repository.store(ContributorProjection {
				id: contributor_id.clone(),
				github_identifier,
				github_username: user.name,
				account: contributor.account,
			})?;
		}

		Ok(())
	}
}

#[async_trait]
impl Projector<Contribution> for ContributorProjector {
	async fn project(&self, event: &<Contribution as Aggregate>::Event) {
		let result = match event {
			ContributionEvent::Assigned {
				id: _,
				contributor_id,
			} => self.on_contribution_assigned(contributor_id).await,
			_ => Ok(()),
		};

		if let Err(error) = result {
			error!("Unable to project event {event}: {}", error.to_string());
		}
	}
}
