// ! Deprecated : This on-chain event is kept for retro-compatibility with former deleted event
// ! Please use instead the ContributionClosed event

use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{ContractAddress, ContributionEvent, Event, HexPrefixedString};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct Deleted;

impl EventTranslator for Deleted {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionDeleted").unwrap()
	}

	fn to_domain_event(
		_: &Option<ContractAddress>,
		_: &ContractAddress,
		mut topics: Topics,
	) -> Result<Event, FromEventError> {
		let contribution_id: HexPrefixedString = topics.pop_front_as()?;

		Ok(Event::Contribution(ContributionEvent::Closed {
			id: contribution_id.into(),
		}))
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use crate::HexPrefixedString;
	use rstest::*;
	use std::str::FromStr;

	#[fixture]
	fn apibara_event_data() -> Topics {
		vec![vec![
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			6, 149, 119, 230, 117, 106, 153, 181, 132, 181, 209, 206, 142, 96, 101, 10, 227, 59,
			110, 43, 19, 84, 23, 131, 69, 130, 104, 240, 125, 166, 179, 138,
		]]
		.into()
	}

	#[rstest]
	fn selector() {
		assert_eq!(
			get_selector_from_name("ContributionDeleted").unwrap(),
			<Deleted as EventTranslator>::selector()
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

		let result = <Deleted as EventTranslator>::to_domain_event(
			&Some(caller_address),
			&contract_address,
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			Event::Contribution(ContributionEvent::Closed {
				id: HexPrefixedString::from_str(
					"0x069577e6756a99b584b5d1ce8e60650ae33b6e2b13541783458268f07da6b38a"
				)
				.unwrap()
				.into()
			},),
			result.unwrap()
		);
	}
}
