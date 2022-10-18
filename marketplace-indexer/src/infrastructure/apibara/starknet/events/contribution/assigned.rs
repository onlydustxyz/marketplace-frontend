use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{
	ContractAddress, ContributionEvent, ContributorAccountAddress, Event as DomainEvent,
	HexPrefixedString,
};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct Assigned;

impl EventTranslator for Assigned {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionAssigned").unwrap()
	}

	fn to_domain_event(
		opt_caller: &Option<ContractAddress>,
		_: &ContractAddress,
		mut topics: Topics,
	) -> Result<DomainEvent, FromEventError> {
		let contribution_id: HexPrefixedString = topics.pop_front_as()?;
		let contributor_account_address: ContributorAccountAddress = topics.pop_front_as()?;

		if let Some(caller) = opt_caller {
			if caller == contributor_account_address.as_contract_address() {
				return Ok(DomainEvent::Contribution(ContributionEvent::Claimed {
					id: contribution_id.into(),
					contributor_account_address,
				}));
			}
		}

		Ok(DomainEvent::Contribution(ContributionEvent::Assigned {
			id: contribution_id.into(),
			contributor_account_address,
		}))
	}
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use super::*;
	use rstest::*;

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
			vec![
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0,
			],
		]
		.into()
	}

	#[rstest]
	fn selector() {
		assert_eq!(
			get_selector_from_name("ContributionAssigned").unwrap(),
			<Assigned as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_assigned_event_from_apibara(apibara_event_data: Topics) {
		let result = <Assigned as EventTranslator>::to_domain_event(
			&Default::default(),
			&Default::default(),
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			DomainEvent::Contribution(ContributionEvent::Assigned {
				id: 12.into(),
				contributor_account_address: ContributorAccountAddress::from(24)
			},),
			result.unwrap()
		);
	}

	#[rstest]
	fn create_claimed_event_from_apibara(apibara_event_data: Topics) {
		let result = <Assigned as EventTranslator>::to_domain_event(
			&Some(HexPrefixedString::from_str("0x0018").unwrap()),
			&Default::default(),
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			DomainEvent::Contribution(ContributionEvent::Claimed {
				id: 12.into(),
				contributor_account_address: ContributorAccountAddress::from(24)
			},),
			result.unwrap()
		);
	}
}
