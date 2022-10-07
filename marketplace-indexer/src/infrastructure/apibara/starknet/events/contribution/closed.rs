use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{ContributionEvent, Event, HexPrefixedString};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct Closed;

impl EventTranslator for Closed {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionClosed").unwrap()
	}

	fn to_domain_event(mut topics: Topics) -> Result<Event, FromEventError> {
		let contribution_id: HexPrefixedString = topics.pop_front_as()?;

		Ok(Event::Contribution(ContributionEvent::Closed {
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
			get_selector_from_name("ContributionClosed").unwrap(),
			<Closed as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_event_from_apibara(apibara_event_data: Topics) {
		let result = <Closed as EventTranslator>::to_domain_event(apibara_event_data);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			Event::Contribution(ContributionEvent::Closed { id: 12.into() },),
			result.unwrap()
		);
	}
}
