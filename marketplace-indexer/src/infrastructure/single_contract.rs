use crate::domain::{EventFilter, EventFilterRepository, EventFilterRepositoryError};
use marketplace_domain::ContractAddress;

pub struct SingleContract(ContractAddress);

impl SingleContract {
	pub fn new(contribution_contract: ContractAddress) -> Self {
		Self(contribution_contract)
	}
}

impl Default for SingleContract {
	fn default() -> Self {
		Self::new(contributions_contract())
	}
}

impl EventFilterRepository for SingleContract {
	fn insert(&self, _event_filter: &EventFilter) -> Result<(), EventFilterRepositoryError> {
		Ok(())
	}

	fn matches(&self, event_filter: &EventFilter) -> Result<bool, EventFilterRepositoryError> {
		Ok(&self.0 == &event_filter.source_contract)
	}
}

fn contributions_contract() -> ContractAddress {
	std::env::var("CONTRIBUTIONS_ADDRESS")
		.expect("CONTRIBUTIONS_ADDRESS must be set")
		.parse()
		.expect("CONTRIBUTIONS_ADDRESS is not a valid contract address")
}

#[cfg(test)]
mod test {
	use super::*;
	use envtestkit::{lock::lock_test, set_env};
	use rstest::*;
	use std::ffi::OsString;

	#[rstest]
	#[case::no_panic(Some("0x123456"))]
	#[should_panic(expected = "CONTRIBUTIONS_ADDRESS must be set: NotPresent")]
	#[case::panic(None)]
	#[should_panic(
		expected = "CONTRIBUTIONS_ADDRESS is not a valid contract address: InvalidPrefix"
	)]
	#[case::panic(Some("Invalid address"))]
	fn should_panic_on_invalid_values(#[case] contract_address: Option<&str>) {
		let _lock = lock_test();
		let _test =
			contract_address.map(|value| set_env(OsString::from("CONTRIBUTIONS_ADDRESS"), value));

		SingleContract::default();
	}

	#[rstest]
	fn should_match_against_the_contract_address() {
		let contract = SingleContract::new("0x1234".parse().unwrap());
		assert!(
			contract
				.matches(&EventFilter {
					source_contract: "0x1234".parse().unwrap()
				})
				.unwrap()
		);

		assert!(
			!contract
				.matches(&EventFilter {
					source_contract: "0x123456".parse().unwrap()
				})
				.unwrap()
		);
	}
}
