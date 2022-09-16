use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{ContributionEvent, Event as DomainEvent, HexPrefixedString};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct GateChanged;

impl EventTranslator for GateChanged {
	fn selector() -> FieldElement {
		get_selector_from_name("GateChanged").unwrap()
	}

	fn to_domain_event(mut topics: Topics) -> Result<DomainEvent, FromEventError> {
		let contribution_id: HexPrefixedString = topics.pop_front_as()?;
		let gate: u128 = topics.pop_front_as()?;

		Ok(DomainEvent::Contribution(ContributionEvent::GateChanged {
			id: contribution_id.into(),
			gate: gate as u8,
		}))
	}
}
