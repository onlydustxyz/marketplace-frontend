use crate::*;
use std::sync::Arc;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Signature check failed")]
	Signature(#[source] OnChainAccountVerifierError),
	#[error("Github authenticationk failed")]
	GithubAuthentication(#[source] GithubClientError),
}

pub type DiscordHandle = String;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Contributor {
	id: ContributorAccountAddress,
	github_identifier: GithubUserId,
	discord_handle: Option<DiscordHandle>,
}

impl Aggregate for Contributor {
	type Event = ContributorEvent;
	type Id = ContributorAccountAddress;
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
				contributor_account_address: contributor_account,
				github_identifier,
			} => Self {
				id: contributor_account.clone(),
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
	pub async fn associate_github_account<S: Clone + Send + Sync>(
		account_verifier: Arc<dyn OnChainAccountVerifier<SignedData = S>>,
		github_client: Arc<dyn GithubClient>,
		authorization_code: String,
		contributor_account_address: ContributorAccountAddress,
		signed_data: S,
	) -> Result<Vec<Event>, Error> {
		account_verifier
			.check_signature(&signed_data, &contributor_account_address)
			.await
			.map_err(Error::Signature)?;

		let github_identifier = github_client
			.authenticate_user(authorization_code)
			.await
			.map_err(Error::GithubAuthentication)?;

		Ok(vec![Event::Contributor(
			ContributorEvent::GithubAccountAssociated {
				contributor_account_address: contributor_account_address.clone(),
				github_identifier,
			},
		)])
	}

	pub fn register_discord_handle(
		contributor_account_address: ContributorAccountAddress,
		discord_handle: ContributorDiscordHandle,
	) -> Result<Vec<Event>, Error> {
		Ok(vec![Event::Contributor(
			ContributorEvent::DiscordHandleRegistered {
				contributor_account_address,
				discord_handle,
			},
		)])
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use assert_matches::assert_matches;
	use async_trait::async_trait;
	use mockall::{mock, predicate::eq};
	use rstest::*;
	use std::{str::FromStr, sync::Arc};

	mock! {
		OnChainAccountVerifier {}
		#[async_trait]
		impl OnChainAccountVerifier for OnChainAccountVerifier {
			type SignedData = String;

			async fn check_signature(
				&self,
				signed_data: &<MockOnChainAccountVerifier as OnChainAccountVerifier>::SignedData,
				account_address: &ContributorAccountAddress,
			) -> Result<(), OnChainAccountVerifierError>;
		}
	}

	#[fixture]
	fn contributor_account_address() -> ContributorAccountAddress {
		ContributorAccountAddress::from_str("0x1234").unwrap()
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
		contributor_account_address: ContributorAccountAddress,
		github_identifier: GithubUserId,
	) -> ContributorEvent {
		ContributorEvent::GithubAccountAssociated {
			contributor_account_address,
			github_identifier,
		}
	}

	#[rstest]
	fn create_contributor(
		github_account_associated_event: ContributorEvent,
		contributor_account_address: ContributorAccountAddress,
		github_identifier: GithubUserId,
	) {
		let contributor = super::Contributor::from_events(&[github_account_associated_event]);
		assert_eq!(contributor_account_address, contributor.id);
		assert_eq!(github_identifier, contributor.github_identifier);
	}

	#[rstest]
	async fn associate_github_account(contributor_account_address: ContributorAccountAddress) {
		let mut account_verifier = MockOnChainAccountVerifier::new();
		let mut github_client = MockGithubClient::new();
		let authorization_code = "thecode".to_string();
		let signed_data = "signature".to_string();

		account_verifier
			.expect_check_signature()
			.with(
				eq(signed_data.clone()),
				eq(contributor_account_address.clone()),
			)
			.once()
			.returning(|_, _| Ok(()));

		github_client
			.expect_authenticate_user()
			.with(eq(authorization_code.clone()))
			.once()
			.returning(|_| Ok(11u64));

		let result = super::Contributor::associate_github_account(
			Arc::new(account_verifier),
			Arc::new(github_client),
			authorization_code,
			contributor_account_address,
			signed_data,
		)
		.await;

		assert!(result.is_ok());

		let emitted_events = result.unwrap();
		assert_eq!(1, emitted_events.len());
		assert_matches!(
			emitted_events.first().unwrap(),
			Event::Contributor(ContributorEvent::GithubAccountAssociated {
				contributor_account_address: _,
				github_identifier: _,
			})
		);
	}

	#[rstest]
	async fn register_discord_handle(
		contributor_account_address: ContributorAccountAddress,
		discord_handle: ContributorDiscordHandle,
	) {
		let result = Contributor::register_discord_handle(
			contributor_account_address.clone(),
			discord_handle.clone(),
		);

		assert!(result.is_ok(), "{}", result.err().unwrap());

		let emitted_events = result.unwrap();
		assert_eq!(1, emitted_events.len());
		assert_eq!(
			emitted_events.first().unwrap().clone(),
			Event::Contributor(ContributorEvent::DiscordHandleRegistered {
				contributor_account_address,
				discord_handle,
			})
		);
	}
}
