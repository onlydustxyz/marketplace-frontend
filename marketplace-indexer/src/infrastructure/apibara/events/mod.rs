mod contribution;
mod topics;
use anyhow::anyhow;
use topics::*;

use crate::domain::ObservedEvent;

use super::apibara::{event::Event as ApibaraEventInner, Event as ApibaraEvent, StarkNetEvent};
use marketplace_domain::Event as DomainEvent;
use starknet::core::types::FieldElement;
use thiserror::Error;

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

impl TryFrom<ApibaraEvent> for ObservedEvent {
	type Error = FromEventError;

	fn try_from(event: ApibaraEvent) -> Result<Self, Self::Error> {
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
					_ if selector == contribution::Unassigned::selector() =>
						Ok(contribution::Unassigned::to_domain_event(data)?),
					_ if selector == contribution::Validated::selector() =>
						Ok(contribution::Validated::to_domain_event(data)?),
					_ => Err(Self::Error::Unsupported),
				}?;

				let address = FromEventFieldElement::try_from(address)?;
				let transaction_hash = FromEventFieldElement::try_from(transaction_hash)?;

				Ok(ObservedEvent {
					event: domain_event,
					deduplication_id: format!(
						"{:#x}_{:#x}_{log_index}",
						address.0, transaction_hash.0
					),
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
	use marketplace_domain::ContributionEvent;
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
				..Default::default()
			})),
		}
	}

	#[rstest]
	fn contribution_created(contract_address: Vec<u8>, transaction_hash: Vec<u8>) {
		let apibara_event = apibara_event(
			selector::<contribution::Created>(),
			contract_address,
			transaction_hash,
		);

		assert_eq!(
			ObservedEvent {
				event: DomainEvent::Contribution(ContributionEvent::Created {
					id: Default::default(),
					project_id: Default::default(),
					issue_number: Default::default(),
					gate: Default::default()
				}),
				deduplication_id: DEDUPLICATION_ID.to_string()
			},
			ObservedEvent::try_from(apibara_event).unwrap()
		);
	}

	#[rstest]
	fn contribution_assigned(contract_address: Vec<u8>, transaction_hash: Vec<u8>) {
		let apibara_event = apibara_event(
			selector::<contribution::Assigned>(),
			contract_address,
			transaction_hash,
		);

		assert_eq!(
			ObservedEvent {
				event: DomainEvent::Contribution(ContributionEvent::Assigned {
					id: Default::default(),
					contributor_id: Default::default()
				}),
				deduplication_id: DEDUPLICATION_ID.to_string()
			},
			ObservedEvent::try_from(apibara_event).unwrap()
		);
	}

	#[rstest]
	fn contribution_unassigned(contract_address: Vec<u8>, transaction_hash: Vec<u8>) {
		let apibara_event = apibara_event(
			selector::<contribution::Unassigned>(),
			contract_address,
			transaction_hash,
		);

		assert_eq!(
			ObservedEvent {
				event: DomainEvent::Contribution(ContributionEvent::Unassigned {
					id: Default::default(),
				}),
				deduplication_id: DEDUPLICATION_ID.to_string()
			},
			ObservedEvent::try_from(apibara_event).unwrap()
		);
	}

	#[rstest]
	fn contribution_validated(contract_address: Vec<u8>, transaction_hash: Vec<u8>) {
		let apibara_event = apibara_event(
			selector::<contribution::Validated>(),
			contract_address,
			transaction_hash,
		);

		assert_eq!(
			ObservedEvent {
				event: DomainEvent::Contribution(ContributionEvent::Validated {
					id: Default::default(),
				}),
				deduplication_id: DEDUPLICATION_ID.to_string()
			},
			ObservedEvent::try_from(apibara_event).unwrap()
		);
	}
}
