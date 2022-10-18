use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{
	ContractAddress, ContributionEvent, ContributorAccountAddress, Event, HexPrefixedString,
};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct Claimed;

impl EventTranslator for Claimed {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionClaimed").unwrap()
	}

	fn to_domain_event(
		_: &Option<ContractAddress>,
		_: &ContractAddress,
		mut topics: Topics,
	) -> Result<Event, FromEventError> {
		let contribution_id: HexPrefixedString = topics.pop_front_as()?;
		let contributor_account_address: ContributorAccountAddress = topics.pop_front_as()?;

		Ok(Event::Contribution(ContributionEvent::Claimed {
			id: contribution_id.into(),
			contributor_account_address,
		}))
	}
}

#[cfg(test)]
mod test {
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
			get_selector_from_name("ContributionClaimed").unwrap(),
			<Claimed as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_event_from_apibara(apibara_event_data: Topics) {
		let result = <Claimed as EventTranslator>::to_domain_event(
			&Default::default(),
			&Default::default(),
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			Event::Contribution(ContributionEvent::Claimed {
				id: 12.into(),
				contributor_account_address: ContributorAccountAddress::from(24)
			},),
			result.unwrap()
		);
	}
}
