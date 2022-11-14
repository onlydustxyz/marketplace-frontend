use crate::*;
use std::sync::Arc;
use thiserror::Error;
use uuid::Uuid;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Github authenticationk failed")]
	GithubAuthentication(#[source] GithubClientError),
}

pub type DiscordHandle = String;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Contributor {
	id: Uuid,
	github_identifier: GithubUserId,
	discord_handle: Option<DiscordHandle>,
}

impl Aggregate for Contributor {
	type Event = ContributorEvent;
	type Id = Uuid;
}

impl From<ContributorEvent> for Event {
	fn from(event: ContributorEvent) -> Self {
		Event::Contributor(event)
	}
}

impl EventSourcable for Contributor {
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			ContributorEvent::GithubAccountAssociated {
				user_id: id,
				github_identifier,
			} => Self {
				id: *id,
				github_identifier: *github_identifier,
				..Default::default()
			},
			ContributorEvent::DiscordHandleRegistered { discord_handle, .. } => Self {
				discord_handle: Some(discord_handle.clone()),
				..self
			},
		}
	}
}

impl AggregateRoot for Contributor {}

impl Contributor {
	pub async fn associate_github_account(
		github_client: Arc<dyn GithubClient>,
		authorization_code: String,
		id: &Uuid,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		let github_identifier = github_client
			.authenticate_user(authorization_code)
			.await
			.map_err(Error::GithubAuthentication)?;

		Ok(vec![ContributorEvent::GithubAccountAssociated {
			user_id: *id,
			github_identifier,
		}])
	}

	pub fn register_discord_handle(
		user_id: Uuid,
		discord_handle: ContributorDiscordHandle,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		Ok(vec![ContributorEvent::DiscordHandleRegistered {
			user_id,
			discord_handle,
		}])
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use assert_matches::assert_matches;
	use mockall::predicate::eq;
	use rstest::*;
	use std::{str::FromStr, sync::Arc};

	#[fixture]
	fn user_id() -> Uuid {
		Uuid::from_str("3d863031-e9bb-42dc-becd-67999675fb8b").unwrap()
	}

	#[fixture]
	fn github_identifier() -> GithubUserId {
		22u64
	}

	#[fixture]
	fn discord_handle() -> ContributorDiscordHandle {
		ContributorDiscordHandle::from("Antho#9314")
	}

	#[fixture]
	fn github_account_associated_event(
		user_id: Uuid,
		github_identifier: GithubUserId,
	) -> ContributorEvent {
		ContributorEvent::GithubAccountAssociated {
			user_id,
			github_identifier,
		}
	}

	#[rstest]
	fn create_contributor(
		github_account_associated_event: ContributorEvent,
		user_id: Uuid,
		github_identifier: GithubUserId,
	) {
		let contributor = super::Contributor::from_events(&[github_account_associated_event]);
		assert_eq!(user_id, contributor.id);
		assert_eq!(github_identifier, contributor.github_identifier);
	}

	#[rstest]
	async fn associate_github_account(user_id: Uuid) {
		let mut github_client = MockGithubClient::new();
		let authorization_code = "thecode".to_string();

		github_client
			.expect_authenticate_user()
			.with(eq(authorization_code.clone()))
			.once()
			.returning(|_| Ok(11u64));

		let result = super::Contributor::associate_github_account(
			Arc::new(github_client),
			authorization_code,
			&user_id,
		)
		.await;

		assert!(result.is_ok());

		let emitted_events = result.unwrap();
		assert_eq!(1, emitted_events.len());
		assert_matches!(
			emitted_events.first().unwrap(),
			ContributorEvent::GithubAccountAssociated {
				user_id: _,
				github_identifier: _,
			}
		);
	}

	#[rstest]
	async fn register_discord_handle(user_id: Uuid, discord_handle: ContributorDiscordHandle) {
		let result = Contributor::register_discord_handle(user_id, discord_handle.clone());

		assert!(result.is_ok(), "{}", result.err().unwrap());

		let emitted_events = result.unwrap();
		assert_eq!(1, emitted_events.len());
		assert_eq!(
			emitted_events.first().unwrap().clone(),
			ContributorEvent::DiscordHandleRegistered {
				user_id,
				discord_handle,
			}
		);
	}
}
