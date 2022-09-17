mod contribution;
mod project;
mod topics;

use super::{Bytes, TryFromBytes};

use crate::domain::ObservedEvent;
use chrono::NaiveDateTime;
use marketplace_domain::{ContractAddress, Event as DomainEvent, HexPrefixedString};
use starknet::core::types::FieldElement;
use thiserror::Error;
use topics::*;

#[derive(Debug, Error)]
pub enum FromEventError {
	#[error("Unsupported event")]
	Unsupported,
	#[error(transparent)]
	Invalid(#[from] anyhow::Error),
}

pub trait EventTranslator {
	fn selector() -> FieldElement;
	fn to_domain_event(topics: Topics) -> Result<DomainEvent, FromEventError>;
}

#[cfg_attr(test, derive(Default))]
struct Event {
	block_hash: HexPrefixedString,
	block_timestamp: NaiveDateTime,
	transaction_hash: HexPrefixedString,
	index: u64,
	from_address: ContractAddress,
	selector: Bytes,
	data: Topics,
}

impl TryFrom<Event> for ObservedEvent {
	type Error = FromEventError;

	fn try_from(event: Event) -> Result<Self, Self::Error> {
		let selector = FieldElement::try_from_bytes(event.selector).map_err(anyhow::Error::msg)?;

		let domain_event = match selector {
			_ if selector == contribution::Created::selector() =>
				Ok(contribution::Created::to_domain_event(event.data)?),
			_ if selector == contribution::Assigned::selector() =>
				Ok(contribution::Assigned::to_domain_event(event.data)?),
			_ if selector == contribution::Claimed::selector() =>
				Ok(contribution::Claimed::to_domain_event(event.data)?),
			_ if selector == contribution::Unassigned::selector() =>
				Ok(contribution::Unassigned::to_domain_event(event.data)?),
			_ if selector == contribution::Validated::selector() =>
				Ok(contribution::Validated::to_domain_event(event.data)?),
			_ if selector == contribution::GateChanged::selector() =>
				Ok(contribution::GateChanged::to_domain_event(event.data)?),
			_ if selector == project::MemberAdded::selector() =>
				Ok(project::MemberAdded::to_domain_event(event.data)?),
			_ if selector == project::MemberRemoved::selector() =>
				Ok(project::MemberRemoved::to_domain_event(event.data)?),
			_ if selector == project::LeadContributorAdded::selector() =>
				Ok(project::LeadContributorAdded::to_domain_event(event.data)?),
			_ if selector == project::LeadContributorRemoved::selector() => Ok(
				project::LeadContributorRemoved::to_domain_event(event.data)?,
			),
			_ => Err(Self::Error::Unsupported),
		}?;

		Ok(ObservedEvent {
			event: domain_event,
			deduplication_id: format!(
				"{}_{}_{}",
				event.from_address, event.transaction_hash, event.index
			),
			timestamp: event.block_timestamp,
		})
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use chrono::NaiveDate;
	use marketplace_domain::{ContributionEvent, ProjectEvent};
	use rstest::*;

	const LOG_INDEX: u64 = 666;
	const DEDUPLICATION_ID: &str = "0x00cb_0x64cb_666";

	#[fixture]
	fn contract_address() -> ContractAddress {
		"0xcb".parse().unwrap()
	}

	#[fixture]
	fn transaction_hash() -> HexPrefixedString {
		"0x64cb".parse().unwrap()
	}

	#[fixture]
	fn timestamp() -> NaiveDateTime {
		NaiveDate::from_ymd(2022, 9, 16).and_hms(14, 37, 11)
	}

	fn empty_topic() -> Bytes {
		vec![0; 32]
	}

	fn selector<T: EventTranslator>() -> Bytes {
		T::selector().to_bytes_be().to_vec()
	}

	fn apibara_event(selector: Bytes) -> Event {
		Event {
			block_timestamp: timestamp(),
			index: LOG_INDEX,
			from_address: contract_address(),
			transaction_hash: transaction_hash(),
			selector,
			data: vec![empty_topic(), empty_topic(), empty_topic(), empty_topic()].into(),
			..Default::default()
		}
	}

	#[rstest]
	#[case(selector::<contribution::Created>(), "ContributionCreated")]
	#[case(selector::<contribution::Assigned>(), "ContributionAssigned")]
	#[case(selector::<contribution::Claimed>(), "ContributionClaimed")]
	#[case(selector::<contribution::Unassigned>(), "ContributionUnassigned")]
	#[case(selector::<contribution::Validated>(), "ContributionValidated")]
	#[case(selector::<contribution::GateChanged>(), "ContributionGateChanged")]
	#[case(selector::<project::MemberAdded>(), "ProjectMemberAdded")]
	#[case(selector::<project::MemberRemoved>(), "ProjectMemberRemoved")]
	#[case(selector::<project::LeadContributorAdded>(), "ProjectLeadContributorAdded")]
	#[case(selector::<project::LeadContributorRemoved>(), "ProjectLeadContributorRemoved")]
	fn event_is_well_converted_from_apibara(
		timestamp: NaiveDateTime,
		#[case] selector: Bytes,
		#[case] expected_event_name: String,
	) {
		let apibara_event = apibara_event(selector);

		let event = ObservedEvent::try_from(apibara_event).unwrap();

		assert_eq!(timestamp, event.timestamp);

		assert_eq!(DEDUPLICATION_ID.to_string(), event.deduplication_id);

		let event_name = match event.event {
			DomainEvent::Contribution(event) =>
				String::from("Contribution")
					+ match event {
						ContributionEvent::Created { .. } => "Created",
						ContributionEvent::Assigned { .. } => "Assigned",
						ContributionEvent::Claimed { .. } => "Claimed",
						ContributionEvent::Unassigned { .. } => "Unassigned",
						ContributionEvent::Validated { .. } => "Validated",
						ContributionEvent::GateChanged { .. } => "GateChanged",
						_ => unimplemented!(), // Off chain events
					},
			DomainEvent::Project(event) =>
				String::from("Project")
					+ match event {
						ProjectEvent::MemberAdded { .. } => "MemberAdded",
						ProjectEvent::MemberRemoved { .. } => "MemberRemoved",
						ProjectEvent::LeadContributorAdded { .. } => "LeadContributorAdded",
						ProjectEvent::LeadContributorRemoved { .. } => "LeadContributorRemoved",
					},
		};

		assert_eq!(expected_event_name, event_name);
	}
}
