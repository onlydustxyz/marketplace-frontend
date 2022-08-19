use crate::*;
use std::fmt::Display;

#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct GithubIdentifierRegisteredEvent {
	pub profile_contract: ContractAddress,
	pub contributor_id: ContributorId,
	pub identifier: u128,
}

impl Display for GithubIdentifierRegisteredEvent {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"GithubIdentifierRegistered {{ profile_contract: {}, contributor_id: {}, identifier: {} }}",
			self.profile_contract, self.contributor_id, self.identifier
		)
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[rstest]
	fn display() {
		let event_as_string = format!("{}", GithubIdentifierRegisteredEvent::default());
		assert_eq!(
			format!(
				"GithubIdentifierRegistered {{ profile_contract: {}, contributor_id: {}, identifier: {} }}",
				ContractAddress::default(),
				ContributorId::default(),
				u128::default()
			),
			event_as_string
		);
	}
}
