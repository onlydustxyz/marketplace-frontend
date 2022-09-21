use crate::*;
use thiserror::Error;

pub mod event;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Signature check failed")]
	Signature(#[source] OnChainAccountVerifierError),
	#[error("Github authenticationk failed")]
	GithubAuthentication(#[source] GithubClientError),
}

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Contributor {
	id: ContributorAccount,
	github_identifier: GithubUserId,
}

impl Aggregate for Contributor {
	type Event = ContributorEvent;
	type Id = ContributorAccount;
}

impl From<ContributorEvent> for Event {
	fn from(event: ContributorEvent) -> Self {
		Event::Contributor(event)
	}
}

impl EventSourcable for Contributor {
	fn apply_event(self, event: &Event) -> Self {
		match event {
			Event::Contributor(contributor_event) => match contributor_event {
				ContributorEvent::GithubAccountAssociated {
					contributor_account,
					github_identifier,
				} => Self {
					id: contributor_account.clone(),
					github_identifier: *github_identifier,
				},
			},
			Event::Contribution(_) | Event::Project(_) => self,
		}
	}
}

impl Contributor {
	pub async fn verify_github_association<V: OnChainAccountVerifier, G: GithubClient>(
		self,
		account_verifier: V,
		github_client: G,
		authorization_code: String,
		contributor_account: ContributorAccount,
		signed_data: V::SignedData,
	) -> Result<Vec<Event>, Error> {
		account_verifier
			.check_signature(&signed_data, &contributor_account)
			.await
			.map_err(|e| Error::Signature(e))?;

		let github_identifier = github_client
			.authenticate_user(authorization_code)
			.await
			.map_err(|e| Error::GithubAuthentication(e))?;

		Ok(vec![Event::Contributor(
			ContributorEvent::GithubAccountAssociated {
				contributor_account,
				github_identifier,
			},
		)])
	}
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use crate::*;
	use assert_matches::assert_matches;
	use async_trait::async_trait;
	use mockall::{mock, predicate::eq};
	use rstest::*;

	mock! {
		OnChainAccountVerifier {}
		#[async_trait]
		impl OnChainAccountVerifier for OnChainAccountVerifier {
			type SignedData = String;

			async fn check_signature(
				&self,
				signed_data: &<MockOnChainAccountVerifier as OnChainAccountVerifier>::SignedData,
				account_address: &ContributorAccount,
			) -> Result<(), OnChainAccountVerifierError>;
		}
	}

	#[fixture]
	fn contributor_account() -> ContributorAccount {
		ContributorAccount::from_str("0x1234").unwrap()
	}

	#[fixture]
	fn github_identifier() -> GithubUserId {
		22u64
	}

	#[fixture]
	fn github_account_associated_event(
		contributor_account: ContributorAccount,
		github_identifier: GithubUserId,
	) -> Event {
		Event::Contributor(ContributorEvent::GithubAccountAssociated {
			contributor_account,
			github_identifier,
		})
	}

	#[rstest]
	fn create_contributor(
		github_account_associated_event: Event,
		contributor_account: ContributorAccount,
		github_identifier: GithubUserId,
	) {
		let contributor = super::Contributor::from_events(&[github_account_associated_event]);
		assert_eq!(contributor_account, contributor.id);
		assert_eq!(github_identifier, contributor.github_identifier);
	}

	#[rstest]
	async fn verify_github_association(contributor_account: ContributorAccount) {
		let mut account_verifier = MockOnChainAccountVerifier::new();
		let mut github_client = MockGithubClient::new();
		let authorization_code = "thecode".to_string();
		let signed_data = "signature".to_string();

		account_verifier
			.expect_check_signature()
			.with(eq(signed_data.clone()), eq(contributor_account.clone()))
			.once()
			.returning(|_, _| Ok(()));

		github_client
			.expect_authenticate_user()
			.with(eq(authorization_code.clone()))
			.once()
			.returning(|_| Ok(11u64));

		let contributor = super::Contributor::from_events(&[]);
		let result = contributor
			.verify_github_association(
				account_verifier,
				github_client,
				authorization_code,
				contributor_account,
				signed_data,
			)
			.await;

		assert!(result.is_ok());

		let emitted_events = result.unwrap();
		assert_eq!(1, emitted_events.len());
		assert_matches!(
			emitted_events.first().unwrap(),
			Event::Contributor(ContributorEvent::GithubAccountAssociated {
				contributor_account: _,
				github_identifier: _
			})
		);
	}
}
