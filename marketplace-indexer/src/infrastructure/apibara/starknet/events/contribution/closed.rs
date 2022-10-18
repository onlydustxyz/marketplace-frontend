use super::{EventTranslator, FromEventError, Topics};
use marketplace_domain::{ContractAddress, ContributionEvent, Event};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct Closed;

impl EventTranslator for Closed {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionClosed").unwrap()
	}

	fn to_domain_event(
		_: &Option<ContractAddress>,
		contract_address: &ContractAddress,
		_: Topics,
	) -> Result<Event, FromEventError> {
		Ok(Event::Contribution(ContributionEvent::Closed {
			id: contract_address.clone().into(),
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
		vec![].into()
	}

	#[rstest]
	fn selector() {
		assert_eq!(
			get_selector_from_name("ContributionClosed").unwrap(),
			<Closed as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_event_from_apibara(apibara_event_data: Topics) {
		let contract_address = ContractAddress::from_str(
			"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
		)
		.unwrap();
		let result = <Closed as EventTranslator>::to_domain_event(
			&Default::default(),
			&contract_address,
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			Event::Contribution(ContributionEvent::Closed {
				id: contract_address.into()
			},),
			result.unwrap()
		);
	}
}
