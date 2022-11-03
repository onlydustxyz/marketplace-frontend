use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{
	ContractAddress, ContributorAccountAddress, Event as DomainEvent, ProjectEvent, ProjectId,
};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct MemberAdded;

impl EventTranslator for MemberAdded {
	fn selector() -> FieldElement {
		get_selector_from_name("ProjectMemberAdded").unwrap()
	}

	fn to_domain_event(
		_: &Option<ContractAddress>,
		_: &ContractAddress,
		mut topics: Topics,
	) -> Result<DomainEvent, FromEventError> {
		let project_id: u128 = topics.pop_front_as()?;
		let contributor_account_address: ContributorAccountAddress = topics.pop_front_as()?;

		Ok(DomainEvent::Project(ProjectEvent::MemberAdded {
			project_id: project_id as ProjectId,
			contributor_account: contributor_account_address,
		}))
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use marketplace_domain::HexPrefixedString;
	use rstest::*;
	use std::str::FromStr;

	#[fixture]
	fn apibara_event_data() -> Topics {
		vec![
			vec![
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 12,
			],
			vec![
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 24,
			],
		]
		.into()
	}

	#[rstest]
	fn selector() {
		assert_eq!(
			get_selector_from_name("ProjectMemberAdded").unwrap(),
			<MemberAdded as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_event_from_apibara(apibara_event_data: Topics) {
		let caller_address = HexPrefixedString::from_str(
			"0x047993152cd854642e20bacd406cf4fbecf71ea852111edd6b0c4cb575f9cfb2",
		)
		.unwrap();
		let contract_address = ContractAddress::from_str(
			"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
		)
		.unwrap();

		let result = <MemberAdded as EventTranslator>::to_domain_event(
			&Some(caller_address),
			&contract_address,
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			DomainEvent::Project(ProjectEvent::MemberAdded {
				project_id: 12,
				contributor_account: 24.into()
			},),
			result.unwrap()
		);
	}
}
