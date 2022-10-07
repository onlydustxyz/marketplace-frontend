use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{ContributionEvent, Event, HexPrefixedString};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct Deleted;

impl EventTranslator for Deleted {
	fn selector() -> FieldElement {
		get_selector_from_name("ContributionDeleted").unwrap()
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
			get_selector_from_name("ContributionDeleted").unwrap(),
			<Deleted as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_event_from_apibara(apibara_event_data: Topics) {
		let result = <Deleted as EventTranslator>::to_domain_event(apibara_event_data);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			Event::Contribution(ContributionEvent::Closed { id: 12.into() },),
			result.unwrap()
		);
	}
}
