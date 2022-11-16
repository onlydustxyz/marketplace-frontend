use crate::domain::*;
use async_trait::async_trait;
use marketplace_domain::{ContributorDiscordHandle, ContributorEvent, Event};
use std::sync::Arc;
use thiserror::Error;
use tracing::error;
use uuid::Uuid;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	GithubRepo(#[from] GithubClientError),
	#[error(transparent)]
	ContributorProfileRepository(#[from] ContributorProfileRepositoryError),
}

pub struct ContributorWithGithubData {
	github_client: Arc<dyn GithubClient>,
	contributor_projection_repository: Arc<dyn ContributorProfileRepository>,
}

impl ContributorWithGithubData {
	pub fn new(
		github_client: Arc<dyn GithubClient>,
		contributor_projection_repository: Arc<dyn ContributorProfileRepository>,
	) -> Self {
		Self {
			github_client,
			contributor_projection_repository,
		}
	}

	async fn add_contributor(
		&self,
		id: &Uuid,
		github_identifier: &GithubUserId,
	) -> Result<(), Error> {
		if self
			.contributor_projection_repository
			.find_by_id(id)
			.ok()
			.and_then(|contributor| contributor.github_identifier)
			.is_none()
		{
			let user = self.github_client.find_user_by_id(*github_identifier).await?;

			self.contributor_projection_repository
				.upsert_github_user_data(ContributorProfile {
					github_identifier: Some(*github_identifier),
					github_username: Some(user.name),
					id: *id,
					..Default::default()
				})?;
		}

		Ok(())
	}

	fn update_discord_handle(
		&self,
		id: &Uuid,
		discord_handle: &ContributorDiscordHandle,
	) -> Result<(), Error> {
		self.contributor_projection_repository
			.upsert_discord_handle(ContributorProfile {
				id: *id,
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
					user_id,
					github_identifier,
				} => self.add_contributor(user_id, github_identifier).await,
				ContributorEvent::DiscordHandleRegistered {
					user_id,
					discord_handle,
				} => self.update_discord_handle(user_id, discord_handle),
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
	use std::{str::FromStr, sync::Arc};

	#[fixture]
	fn github_client() -> MockGithubClient {
		MockGithubClient::new()
	}

	#[fixture]
	fn contributor_projection_repository() -> MockContributorProfileRepository {
		MockContributorProfileRepository::new()
	}

	#[fixture]
	fn user_id() -> Uuid {
		Uuid::from_str("3d863031-e9bb-42dc-becd-67999675fb8b").unwrap()
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
	fn github_account_associated_event(user_id: Uuid, github_identifier: GithubUserId) -> Event {
		Event::Contributor(ContributorEvent::GithubAccountAssociated {
			user_id,
			github_identifier,
		})
	}

	#[rstest]
	async fn discord_handle_gets_updated_upon_event(
		mut contributor_projection_repository: MockContributorProfileRepository,
		discord_handle: ContributorDiscordHandle,
		user_id: Uuid,
	) {
		contributor_projection_repository
			.expect_upsert_discord_handle()
			.once()
			.with(eq(ContributorProfile {
				id: user_id,
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
					user_id,
					discord_handle,
				},
			))
			.await;
	}

	#[rstest]
	async fn contributor_gets_created_with_contribution(
		mut github_client: MockGithubClient,
		mut contributor_projection_repository: MockContributorProfileRepository,
		github_account_associated_event: Event,
		github_identifier: GithubUserId,
		github_username: String,
		user_id: Uuid,
	) {
		contributor_projection_repository
			.expect_find_by_id()
			.with(eq(user_id))
			.once()
			.returning(|_| Err(ContributorProfileRepositoryError::NotFound));

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
				id: user_id,
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
		mut contributor_projection_repository: MockContributorProfileRepository,
		github_identifier: GithubUserId,
		github_account_associated_event: Event,
	) {
		contributor_projection_repository
			.expect_find_by_id()
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
		mut contributor_projection_repository: MockContributorProfileRepository,
		github_account_associated_event: Event,
		github_identifier: GithubUserId,
		github_username: String,
		user_id: Uuid,
	) {
		contributor_projection_repository
			.expect_find_by_id()
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
				id: user_id,
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
