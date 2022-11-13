use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{
	AccountAddress, ContractAddress, ContributionEvent, Event as DomainEvent, HexPrefixedString,
};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};
use uuid::Uuid;

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
		let contributor_account_address: AccountAddress = topics.pop_front_as()?;

		if let Some(caller) = opt_caller {
			if caller == contributor_account_address.as_contract_address() {
				return Ok(DomainEvent::Contribution(ContributionEvent::Claimed {
					id: contribution_id.into(),
					contributor_id: Uuid::default(), /* TODO: remove when removing blockchain
					                                  * listeners */
				}));
			}
		}

		Ok(DomainEvent::Contribution(ContributionEvent::Assigned {
			id: contribution_id.into(),
			contributor_id: Uuid::default(), /* TODO: remove when removing blockchain
			                                  * listeners */
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
				4, 121, 147, 21, 44, 216, 84, 100, 46, 32, 186, 205, 64, 108, 244, 251, 236, 247,
				30, 168, 82, 17, 30, 221, 107, 12, 76, 181, 117, 249, 207, 178,
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
		let caller_address = HexPrefixedString::from_str(
			"0x057993152cd854642e20bacd406cf4fbecf71ea852111edd6b0c4cb575f9cfb2",
		)
		.unwrap();
		let contract_address = ContractAddress::from_str(
			"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
		)
		.unwrap();
		let assignee_address = HexPrefixedString::from_str(
			"0x047993152cd854642e20bacd406cf4fbecf71ea852111edd6b0c4cb575f9cfb2",
		)
		.unwrap();

		let result = <Assigned as EventTranslator>::to_domain_event(
			&Some(caller_address),
			&contract_address,
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			DomainEvent::Contribution(ContributionEvent::Assigned {
				id: 12.into(),
				contributor_id: Uuid::default()
			},),
			result.unwrap()
		);
	}

	#[rstest]
	fn create_claimed_event_from_apibara(apibara_event_data: Topics) {
		let caller_address = HexPrefixedString::from_str(
			"0x047993152cd854642e20bacd406cf4fbecf71ea852111edd6b0c4cb575f9cfb2",
		)
		.unwrap();
		let result = <Assigned as EventTranslator>::to_domain_event(
			&Some(caller_address.clone()),
			&Default::default(),
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			DomainEvent::Contribution(ContributionEvent::Claimed {
				id: 12.into(),
				contributor_id: Uuid::default()
			},),
			result.unwrap()
		);
	}
}
