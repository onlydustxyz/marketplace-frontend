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
		if self.contributor_projection_repository.find_by_id(contributor_id).is_err() {
			let contributor = self.contributor_service.contributor_by_id(contributor_id).await?;

			let user = self.github_client.find_user_by_id(contributor.github_identifier).await?;

			self.contributor_projection_repository.store(ContributorProjection {
				id: contributor_id.clone(),
				github_identifier: contributor.github_identifier,
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

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::eq;
	use rstest::*;
	use std::sync::Arc;

	#[fixture]
	fn github_client() -> MockGithubClient {
		MockGithubClient::new()
	}

	#[fixture]
	fn contributor_projection_repository() -> MockContributorProjectionRepository {
		MockContributorProjectionRepository::new()
	}

	#[fixture]
	fn contributor_id() -> ContributorId {
		"0x1234".parse().unwrap()
	}

	#[fixture]
	fn contributor_account() -> ContributorAccount {
		"0x4444".parse().unwrap()
	}

	#[fixture]
	fn github_user_id() -> GithubUserId {
		1234
	}

	#[fixture]
	fn github_username() -> String {
		String::from("james_bond")
	}

	#[fixture]
	fn contribution_assigned_event(contributor_id: ContributorId) -> ContributionEvent {
		ContributionEvent::Assigned {
			id: Default::default(),
			contributor_id,
		}
	}

	#[fixture]
	fn contributor_service() -> MockContributorService {
		MockContributorService::new()
	}

	#[rstest]
	async fn contributor_gets_created_with_contribution(
		mut github_client: MockGithubClient,
		mut contributor_projection_repository: MockContributorProjectionRepository,
		mut contributor_service: MockContributorService,
		contribution_assigned_event: ContributionEvent,
		github_user_id: GithubUserId,
		github_username: String,
		contributor_id: ContributorId,
		contributor_account: ContributorAccount,
	) {
		contributor_projection_repository
			.expect_find_by_id()
			.with(eq(contributor_id.clone()))
			.times(1)
			.returning(|_| Err(ContributorProjectionRepositoryError::NotFound));

		let cloned_contributor_id = contributor_id.clone();
		let cloned_contributor_account = contributor_account.clone();
		contributor_service
			.expect_contributor_by_id()
			.times(1)
			.with(eq(contributor_id.clone()))
			.returning(move |_| {
				Ok(Contributor {
					id: cloned_contributor_id.clone(),
					github_identifier: github_user_id,
					account: cloned_contributor_account.clone(),
					..Default::default()
				})
			});

		let cloned_github_username = github_username.clone();
		github_client
			.expect_find_user_by_id()
			.times(1)
			.with(eq(github_user_id))
			.returning(move |_| {
				Ok(GithubUser {
					id: github_user_id,
					name: cloned_github_username.clone(),
				})
			});

		contributor_projection_repository
			.expect_store()
			.times(1)
			.with(eq(ContributorProjection {
				id: contributor_id,
				account: contributor_account,
				github_username,
				github_identifier: github_user_id,
			}))
			.returning(|_| Ok(()));

		let projector = ContributorProjector::new(
			Arc::new(github_client),
			Arc::new(contributor_projection_repository),
			Arc::new(contributor_service),
		);

		projector.project(&contribution_assigned_event).await;
	}

	#[rstest]
	async fn contributor_is_not_stored_if_already_present(
		mut github_client: MockGithubClient,
		mut contributor_projection_repository: MockContributorProjectionRepository,
		mut contributor_service: MockContributorService,
		contribution_assigned_event: ContributionEvent,
	) {
		contributor_projection_repository
			.expect_find_by_id()
			.times(1)
			.returning(|_| Ok(ContributorProjection::default()));

		contributor_service.expect_contributor_by_id().never();
		github_client.expect_find_user_by_id().never();
		contributor_projection_repository.expect_store().never();

		let projector = ContributorProjector::new(
			Arc::new(github_client),
			Arc::new(contributor_projection_repository),
			Arc::new(contributor_service),
		);

		projector.project(&contribution_assigned_event).await;
	}
}
