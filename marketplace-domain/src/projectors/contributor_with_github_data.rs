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
}

pub struct ContributorWithGithubData {
	github_client: Arc<dyn GithubClient>,
	contributor_projection_repository: Arc<dyn ContributorProjectionRepository>,
}

impl ContributorWithGithubData {
	pub fn new(
		github_client: Arc<dyn GithubClient>,
		contributor_projection_repository: Arc<dyn ContributorProjectionRepository>,
	) -> Self {
		Self {
			github_client,
			contributor_projection_repository,
		}
	}

	async fn add_contributor(
		&self,
		contributor_account_address: &ContributorAccountAddress,
		github_identifier: &GithubUserId,
	) -> Result<(), Error> {
		if self
			.contributor_projection_repository
			.find_by_account_address(contributor_account_address)
			.ok()
			.and_then(|contributor| contributor.github_identifier)
			.is_none()
		{
			let user = self.github_client.find_user_by_id(*github_identifier).await?;

			self.contributor_projection_repository
				.upsert_github_user_data(ContributorProfile {
					github_identifier: Some(*github_identifier),
					github_username: Some(user.name),
					account: contributor_account_address.clone(),
					..Default::default()
				})?;
		}

		Ok(())
	}

	fn update_discord_handle(
		&self,
		contributor_account_address: &ContributorAccountAddress,
		discord_handle: &ContributorDiscordHandle,
	) -> Result<(), Error> {
		self.contributor_projection_repository
			.upsert_discord_handle(ContributorProfile {
				account: contributor_account_address.clone(),
				discord_handle: Some(discord_handle.clone()),
				..Default::default()
			})?;

		Ok(())
	}
}

#[async_trait]
impl EventListener for ContributorWithGithubData {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Contributor(contributor_event) => match contributor_event {
				ContributorEvent::GithubAccountAssociated {
					contributor_account_address,
					github_identifier,
				} => self.add_contributor(contributor_account_address, github_identifier).await,
				ContributorEvent::DiscordHandleRegistered {
					contributor_account_address,
					discord_handle,
				} => self.update_discord_handle(contributor_account_address, discord_handle),
			},
			_ => return,
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
	fn contributor_account_address() -> ContributorAccountAddress {
		"0x4444".parse().unwrap()
	}

	#[fixture]
	fn github_identifier() -> GithubUserId {
		1234
	}

	#[fixture]
	fn discord_handle() -> ContributorDiscordHandle {
		ContributorDiscordHandle::from("Antho#9314")
	}

	#[fixture]
	fn github_username() -> String {
		String::from("james_bond")
	}

	#[fixture]
	fn github_account_associated_event(
		contributor_account_address: ContributorAccountAddress,
		github_identifier: GithubUserId,
	) -> Event {
		Event::Contributor(ContributorEvent::GithubAccountAssociated {
			contributor_account_address,
			github_identifier,
		})
	}

	#[rstest]
	async fn discord_handle_gets_updated_upon_event(
		mut contributor_projection_repository: MockContributorProjectionRepository,
		discord_handle: ContributorDiscordHandle,
		contributor_account_address: ContributorAccountAddress,
	) {
		contributor_projection_repository
			.expect_upsert_discord_handle()
			.once()
			.with(eq(ContributorProfile {
				account: contributor_account_address.clone(),
				discord_handle: Some(discord_handle.clone()),
				..Default::default()
			}))
			.returning(|_| Ok(()));

		let projector = ContributorWithGithubData::new(
			Arc::new(github_client()),
			Arc::new(contributor_projection_repository),
		);

		projector
			.on_event(&Event::Contributor(
				ContributorEvent::DiscordHandleRegistered {
					contributor_account_address,
					discord_handle,
				},
			))
			.await;
	}

	#[rstest]
	async fn contributor_gets_created_with_contribution(
		mut github_client: MockGithubClient,
		mut contributor_projection_repository: MockContributorProjectionRepository,
		github_account_associated_event: Event,
		github_identifier: GithubUserId,
		github_username: String,
		contributor_account_address: ContributorAccountAddress,
	) {
		contributor_projection_repository
			.expect_find_by_account_address()
			.with(eq(contributor_account_address.clone()))
			.once()
			.returning(|_| Err(ContributorProjectionRepositoryError::NotFound));

		let cloned_github_username = github_username.clone();
		github_client
			.expect_find_user_by_id()
			.once()
			.with(eq(github_identifier))
			.returning(move |_| {
				Ok(GithubUser {
					id: github_identifier,
					name: cloned_github_username.clone(),
				})
			});

		contributor_projection_repository
			.expect_upsert_github_user_data()
			.times(1)
			.with(eq(ContributorProfile {
				account: contributor_account_address,
				github_username: Some(github_username),
				github_identifier: Some(github_identifier),
				discord_handle: None,
			}))
			.returning(|_| Ok(()));

		let projector = ContributorWithGithubData::new(
			Arc::new(github_client),
			Arc::new(contributor_projection_repository),
		);

		projector.on_event(&github_account_associated_event).await;
	}

	#[rstest]
	async fn contributor_is_not_stored_if_already_present(
		mut github_client: MockGithubClient,
		mut contributor_projection_repository: MockContributorProjectionRepository,
		github_identifier: GithubUserId,
		github_account_associated_event: Event,
	) {
		contributor_projection_repository
			.expect_find_by_account_address()
			.once()
			.returning(move |_| {
				Ok(ContributorProfile {
					github_identifier: Some(github_identifier),
					..Default::default()
				})
			});

		github_client.expect_find_user_by_id().never();
		contributor_projection_repository.expect_upsert_github_user_data().never();

		let projector = ContributorWithGithubData::new(
			Arc::new(github_client),
			Arc::new(contributor_projection_repository),
		);

		projector.on_event(&github_account_associated_event).await;
	}

	#[rstest]
	async fn contributor_is_stored_if_already_present_but_without_github_id(
		mut github_client: MockGithubClient,
		mut contributor_projection_repository: MockContributorProjectionRepository,
		github_account_associated_event: Event,
		github_identifier: GithubUserId,
		github_username: String,
		contributor_account_address: ContributorAccountAddress,
	) {
		contributor_projection_repository
			.expect_find_by_account_address()
			.once()
			.returning(|_| Ok(ContributorProfile::default()));

		let cloned_github_username = github_username.clone();
		github_client
			.expect_find_user_by_id()
			.once()
			.with(eq(github_identifier))
			.returning(move |_| {
				Ok(GithubUser {
					id: github_identifier,
					name: cloned_github_username.clone(),
				})
			});

		contributor_projection_repository
			.expect_upsert_github_user_data()
			.times(1)
			.with(eq(ContributorProfile {
				account: contributor_account_address,
				github_username: Some(github_username),
				github_identifier: Some(github_identifier),
				discord_handle: None,
			}))
			.returning(|_| Ok(()));

		let projector = ContributorWithGithubData::new(
			Arc::new(github_client),
			Arc::new(contributor_projection_repository),
		);

		projector.on_event(&github_account_associated_event).await;
	}
}
