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

	async fn add_contributor(&self, contributor_id: &ContributorId) -> Result<(), Error> {
		if self.contributor_projection_repository.find_by_id(contributor_id).is_err() {
			let contributor = self.contributor_service.contributor_by_id(contributor_id).await?;

			let user = self.github_client.find_user_by_id(contributor.github_identifier).await?;

			self.contributor_projection_repository.insert(ContributorProjection {
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
impl EventListener for ContributorProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Contribution(contribution_event) => match contribution_event {
				ContributionEvent::Applied {
					id: _,
					contributor_id,
					applied_at: _,
				}
				| ContributionEvent::Claimed {
					id: _,
					contributor_id,
				}
				| ContributionEvent::Assigned {
					id: _,
					contributor_id,
				} => self.add_contributor(contributor_id).await,
				_ => return,
			},
			Event::Project(_) => return,
		};

		if let Err(error) = result {
			error!("Unable to project event {event}: {}", error.to_string());
		}
	}
}

#[cfg(test)]
#[allow(clippy::too_many_arguments)]
mod test {
	use super::*;
	use chrono::NaiveDate;
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
	fn contribution_applied_event(contributor_id: ContributorId) -> Event {
		Event::Contribution(ContributionEvent::Applied {
			id: Default::default(),
			contributor_id,
			applied_at: NaiveDate::from_ymd(2022, 9, 16).and_hms(14, 37, 11),
		})
	}

	#[fixture]
	fn contribution_assigned_event(contributor_id: ContributorId) -> Event {
		Event::Contribution(ContributionEvent::Assigned {
			id: Default::default(),
			contributor_id,
		})
	}

	#[fixture]
	fn contribution_claimed_event(contributor_id: ContributorId) -> Event {
		Event::Contribution(ContributionEvent::Claimed {
			id: Default::default(),
			contributor_id,
		})
	}

	#[fixture]
	fn contributor_service() -> MockContributorService {
		MockContributorService::new()
	}

	#[rstest]
	#[case(contribution_applied_event(contributor_id()))]
	#[case(contribution_assigned_event(contributor_id()))]
	#[case(contribution_claimed_event(contributor_id()))]
	async fn contributor_gets_created_with_contribution(
		mut github_client: MockGithubClient,
		mut contributor_projection_repository: MockContributorProjectionRepository,
		mut contributor_service: MockContributorService,
		#[case] event: Event,
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
			.expect_insert()
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

		projector.on_event(&event).await;
	}

	#[rstest]
	async fn contributor_is_not_stored_if_already_present(
		mut github_client: MockGithubClient,
		mut contributor_projection_repository: MockContributorProjectionRepository,
		mut contributor_service: MockContributorService,
		contribution_applied_event: Event,
	) {
		contributor_projection_repository
			.expect_find_by_id()
			.times(1)
			.returning(|_| Ok(ContributorProjection::default()));

		contributor_service.expect_contributor_by_id().never();
		github_client.expect_find_user_by_id().never();
		contributor_projection_repository.expect_insert().never();

		let projector = ContributorProjector::new(
			Arc::new(github_client),
			Arc::new(contributor_projection_repository),
			Arc::new(contributor_service),
		);

		projector.on_event(&contribution_applied_event).await;
	}
}
