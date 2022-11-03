use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{ContractAddress, ContributionEvent, Event as DomainEvent};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct Deployed;

impl EventTranslator for Deployed {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionDeployed").unwrap()
	}

	fn to_domain_event(
		_: &Option<ContractAddress>,
		_: &ContractAddress,
		mut topics: Topics,
	) -> Result<DomainEvent, FromEventError> {
		let contract_address: ContractAddress = topics.pop_front_as()?;

		Ok(DomainEvent::Contribution(ContributionEvent::Deployed {
			contract_address,
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
		vec![vec![
			4, 121, 147, 21, 44, 216, 84, 100, 46, 32, 186, 205, 64, 108, 244, 251, 236, 247, 30,
			168, 82, 17, 30, 221, 107, 12, 76, 181, 117, 249, 207, 178,
		]]
		.into()
	}

	#[rstest]
	fn selector() {
		assert_eq!(
			get_selector_from_name("ContributionDeployed").unwrap(),
			<Deployed as EventTranslator>::selector()
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

		let result = <Deployed as EventTranslator>::to_domain_event(
			&Some(caller_address),
			&contract_address,
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());

		assert_eq!(
			DomainEvent::Contribution(ContributionEvent::Deployed {
				contract_address:
					"0x047993152cd854642e20bacd406cf4fbecf71ea852111edd6b0c4cb575f9cfb2"
						.parse()
						.unwrap(),
			},),
			result.unwrap()
		);
	}
}
