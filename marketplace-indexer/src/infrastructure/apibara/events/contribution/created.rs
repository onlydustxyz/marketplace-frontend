use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{ContributionEvent, Event, HexPrefixedString};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct Created;

impl EventTranslator for Created {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionCreated").unwrap()
	}

	fn to_domain_event(mut topics: Topics) -> Result<Event, FromEventError> {
		let contribution_id: HexPrefixedString = topics.pop_front_as()?;
		let project_id: u128 = topics.pop_front_as()?;
		let issue_number: u128 = topics.pop_front_as()?;
		let gate: u128 = topics.pop_front_as()?;

		Ok(Event::Contribution(ContributionEvent::Created {
			id: contribution_id.into(),
			project_id: project_id as u64,
			issue_number: issue_number as u64,
			gate: gate as u8,
		}))
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use crate::infrastructure::apibara::proto::TopicValue;
	use rstest::*;

	#[fixture]
	fn apibara_event_data() -> Topics {
		vec![
			TopicValue {
				value: vec![
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 12,
				],
			},
			TopicValue {
				value: vec![
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 23,
				],
			},
			TopicValue {
				value: vec![
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 34,
				],
			},
			TopicValue {
				value: vec![
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 1,
				],
			},
		]
		.into()
	}

	#[rstest]
	fn selector() {
		assert_eq!(
			get_selector_from_name("ContributionCreated").unwrap(),
			<Created as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_event_from_apibara(apibara_event_data: Topics) {
		let result = <Created as EventTranslator>::to_domain_event(apibara_event_data);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			Event::Contribution(ContributionEvent::Created {
				id: 12.into(),
				project_id: 23,
				issue_number: 34,
				gate: 1,
			},),
			result.unwrap()
		);
	}
}
