use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{
	ContractAddress, ContributionEvent, Event as DomainEvent, HexPrefixedString,
};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct GateChanged;

impl EventTranslator for GateChanged {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionGateChanged").unwrap()
	}

	fn to_domain_event(
		_: &Option<ContractAddress>,
		_: &ContractAddress,
		mut topics: Topics,
	) -> Result<DomainEvent, FromEventError> {
		let contribution_id: HexPrefixedString = topics.pop_front_as()?;
		let gate: u128 = topics.pop_front_as()?;

		Ok(DomainEvent::Contribution(ContributionEvent::GateChanged {
			id: contribution_id.into(),
			gate: gate as u8,
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
				0, 0, 0, 3,
			],
		]
		.into()
	}

	#[rstest]
	fn selector() {
		assert_eq!(
			get_selector_from_name("ContributionGateChanged").unwrap(),
			<GateChanged as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_event_from_apibara(apibara_event_data: Topics) {
		let result = <GateChanged as EventTranslator>::to_domain_event(
			&Default::default(),
			&Default::default(),
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			DomainEvent::Contribution(ContributionEvent::GateChanged {
				id: 12.into(),
				gate: 3
			},),
			result.unwrap()
		);
	}
}
