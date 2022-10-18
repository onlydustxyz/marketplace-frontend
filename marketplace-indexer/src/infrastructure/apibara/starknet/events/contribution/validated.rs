use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{
	ContractAddress, ContributionEvent, Event as DomainEvent, HexPrefixedString,
};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct Validated;

impl EventTranslator for Validated {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionValidated").unwrap()
	}

	fn to_domain_event(
		_: &Option<ContractAddress>,
		_: &ContractAddress,
		mut topics: Topics,
	) -> Result<DomainEvent, FromEventError> {
		let contribution_id: HexPrefixedString = topics.pop_front_as()?;

		Ok(DomainEvent::Contribution(ContributionEvent::Validated {
			id: contribution_id.into(),
		}))
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[fixture]
	fn apibara_event_data() -> Topics {
		vec![vec![
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 12,
		]]
		.into()
	}

	#[rstest]
	fn selector() {
		assert_eq!(
			get_selector_from_name("ContributionValidated").unwrap(),
			<Validated as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_event_from_apibara(apibara_event_data: Topics) {
		let result = <Validated as EventTranslator>::to_domain_event(
			&Default::default(),
			&Default::default(),
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			DomainEvent::Contribution(ContributionEvent::Validated { id: 12.into() },),
			result.unwrap()
		);
	}
}
