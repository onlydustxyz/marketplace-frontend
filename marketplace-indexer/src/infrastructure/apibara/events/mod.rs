mod contribution;
mod project;
mod topics;
use super::apibara::{
	event::Event as ApibaraEventInner, BlockHeader, Event as ApibaraEvent, StarkNetEvent,
};
use crate::domain::ObservedEvent;
use anyhow::anyhow;
use chrono::{NaiveDateTime, Utc};
use marketplace_domain::Event as DomainEvent;
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

struct FromEventFieldElement(FieldElement);

impl TryFrom<Vec<u8>> for FromEventFieldElement {
	type Error = FromEventError;

	fn try_from(value: Vec<u8>) -> Result<Self, Self::Error> {
		let value: [u8; 32] = value.try_into().map_err(|v| anyhow!("{:?}", v))?;
		Ok(FromEventFieldElement(
			FieldElement::from_bytes_be(&value).map_err(anyhow::Error::msg)?,
		))
	}
}

impl TryFrom<(ApibaraEvent, &BlockHeader)> for ObservedEvent {
	type Error = FromEventError;

	fn try_from((event, block): (ApibaraEvent, &BlockHeader)) -> Result<Self, Self::Error> {
		match event.event {
			Some(ApibaraEventInner::Starknet(StarkNetEvent {
				address,
				log_index,
				transaction_hash,
				topics,
				data,
			})) => {
				let selector: FieldElement =
					Topics::from(topics).pop_front_as().map_err(anyhow::Error::msg)?;

				let data = Topics::from(data);
				let domain_event = match selector {
					_ if selector == contribution::Created::selector() =>
						Ok(contribution::Created::to_domain_event(data)?),
					_ if selector == contribution::Assigned::selector() =>
						Ok(contribution::Assigned::to_domain_event(data)?),
					_ if selector == contribution::Claimed::selector() =>
						Ok(contribution::Claimed::to_domain_event(data)?),
					_ if selector == contribution::Unassigned::selector() =>
						Ok(contribution::Unassigned::to_domain_event(data)?),
					_ if selector == contribution::Validated::selector() =>
						Ok(contribution::Validated::to_domain_event(data)?),
					_ if selector == project::MemberAdded::selector() =>
						Ok(project::MemberAdded::to_domain_event(data)?),
					_ if selector == project::MemberRemoved::selector() =>
						Ok(project::MemberRemoved::to_domain_event(data)?),
					_ if selector == project::LeadContributorAdded::selector() =>
						Ok(project::LeadContributorAdded::to_domain_event(data)?),
					_ if selector == project::LeadContributorRemoved::selector() =>
						Ok(project::LeadContributorRemoved::to_domain_event(data)?),
					_ => Err(Self::Error::Unsupported),
				}?;

				let address = FromEventFieldElement::try_from(address)?;
				let transaction_hash = FromEventFieldElement::try_from(transaction_hash)?;
				let timestamp = block
					.timestamp
					.as_ref()
					.map(|timestamp| {
						NaiveDateTime::from_timestamp(
							timestamp.seconds,
							timestamp.nanos as u32, // safe to cast as time cannot be negative
						)
					})
					.unwrap_or_else(|| Utc::now().naive_utc());

				Ok(ObservedEvent {
					event: domain_event,
					deduplication_id: format!(
						"{:#x}_{:#x}_{log_index}",
						address.0, transaction_hash.0
					),
					timestamp,
				})
			},
			None => Err(Self::Error::Invalid(anyhow!("Event missing data"))),
			_ => Err(Self::Error::Unsupported),
		}
	}
}

#[cfg(test)]
mod test {
	use super::{super::apibara::TopicValue, *};
	use marketplace_domain::{ContributionEvent, ProjectEvent};
	use prost_types::Timestamp;
	use rstest::*;

	const LOG_INDEX: u64 = 666;
	const DEDUPLICATION_ID: &str = "0xcb_0x64cb_666";

	#[fixture]
	fn contract_address() -> Vec<u8> {
		vec![
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 203,
		]
	}

	#[fixture]
	fn transaction_hash() -> Vec<u8> {
		vec![
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 100, 203,
		]
	}

	#[fixture]
	fn seconds_since_epoch() -> i64 {
		1_663_186_058
	}

	#[fixture]
	fn block_header(seconds_since_epoch: i64) -> BlockHeader {
		BlockHeader {
			timestamp: Some(Timestamp {
				seconds: seconds_since_epoch,
				nanos: 0,
			}),
			..Default::default()
		}
	}

	fn empty_topic() -> TopicValue {
		TopicValue { value: vec![0; 32] }
	}

	fn selector<T: EventTranslator>() -> TopicValue {
		TopicValue {
			value: T::selector().to_bytes_be().to_vec(),
		}
	}

	fn apibara_event(
		selector: TopicValue,
		contract_address: Vec<u8>,
		transaction_hash: Vec<u8>,
	) -> ApibaraEvent {
		ApibaraEvent {
			event: Some(ApibaraEventInner::Starknet(StarkNetEvent {
				address: contract_address,
				log_index: LOG_INDEX,
				transaction_hash,
				topics: vec![selector],
				data: vec![empty_topic(), empty_topic(), empty_topic(), empty_topic()],
			})),
		}
	}

	#[rstest]
	#[case(selector::<contribution::Created>(), "ContributionCreated")]
	#[case(selector::<contribution::Assigned>(), "ContributionAssigned")]
	#[case(selector::<contribution::Claimed>(), "ContributionClaimed")]
	#[case(selector::<contribution::Unassigned>(), "ContributionUnassigned")]
	#[case(selector::<contribution::Validated>(), "ContributionValidated")]
	#[case(selector::<project::MemberAdded>(), "ProjectMemberAdded")]
	#[case(selector::<project::MemberRemoved>(), "ProjectMemberRemoved")]
	#[case(selector::<project::LeadContributorAdded>(), "ProjectLeadContributorAdded")]
	#[case(selector::<project::LeadContributorRemoved>(), "ProjectLeadContributorRemoved")]
	fn event_is_well_converted_from_apibara(
		contract_address: Vec<u8>,
		transaction_hash: Vec<u8>,
		block_header: BlockHeader,
		seconds_since_epoch: i64,
		#[case] selector: TopicValue,
		#[case] expected_event_name: String,
	) {
		let apibara_event = apibara_event(selector, contract_address, transaction_hash);

		let event = ObservedEvent::try_from((apibara_event, &block_header)).unwrap();

		assert_eq!(
			NaiveDateTime::from_timestamp(seconds_since_epoch, 0),
			event.timestamp
		);

		assert_eq!(DEDUPLICATION_ID.to_string(), event.deduplication_id);

		let event_name = match event.event {
			DomainEvent::Contribution(event) =>
				String::from("Contribution")
					+ match event {
						ContributionEvent::Created { .. } => "Created",
						ContributionEvent::Applied { .. } => "Applied",
						ContributionEvent::Assigned { .. } => "Assigned",
						ContributionEvent::Claimed { .. } => "Claimed",
						ContributionEvent::Unassigned { .. } => "Unassigned",
						ContributionEvent::Validated { .. } => "Validated",
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
