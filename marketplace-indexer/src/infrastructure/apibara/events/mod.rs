mod contribution;
mod topics;
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
	#[error("Invalid event")]
	Invalid,
}

pub trait EventTranslator {
	fn selector() -> FieldElement;
	fn to_domain_event(topics: Topics) -> Result<DomainEvent, FromEventError>;
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
					Topics::from(topics).pop_front_as().map_err(|_| Self::Error::Invalid)?;

				let data = Topics::from(data);
				let domain_event = match selector {
					_ if selector == contribution::Created::selector() => {
						Ok(contribution::Created::to_domain_event(data)?)
					},
					_ if selector == contribution::Assigned::selector() => {
						Ok(contribution::Assigned::to_domain_event(data)?)
					},
					_ if selector == contribution::Unassigned::selector() => {
						Ok(contribution::Unassigned::to_domain_event(data)?)
					},
					_ if selector == contribution::Validated::selector() => {
						Ok(contribution::Validated::to_domain_event(data)?)
					},
					_ => Err(Self::Error::Unsupported),
				}?;

				let address = std::str::from_utf8(&address).unwrap();
				let transaction_hash = std::str::from_utf8(&transaction_hash).unwrap();
				Ok(ObservedEvent {
					event: domain_event,
					deduplication_id: format!("{address}_{transaction_hash}_{log_index}"),
				})
			},
			None => Err(Self::Error::Invalid),
			_ => Err(Self::Error::Unsupported),
		}
	}
}

#[cfg(test)]
mod test {
	use super::{super::apibara::TopicValue, *};
	use marketplace_domain::ContributionEvent;
	use rstest::*;

	const CONTRACT_ADDRESS: &str = "0x42";
	const LOG_INDEX: u64 = 666;
	const TRANSACTION_HASH: &str = "0x1234";
	const DEDUPLICATION_ID: &str = "0x42_0x1234_666";

	fn empty_topic() -> TopicValue {
		TopicValue { value: vec![0; 32] }
	}

	fn selector<T: EventTranslator>() -> TopicValue {
		TopicValue {
			value: T::selector().to_bytes_be().to_vec(),
		}
	}

	fn apibara_event(selector: TopicValue) -> ApibaraEvent {
		ApibaraEvent {
			event: Some(ApibaraEventInner::Starknet(StarkNetEvent {
				address: CONTRACT_ADDRESS.as_bytes().into(),
				log_index: LOG_INDEX,
				transaction_hash: TRANSACTION_HASH.as_bytes().into(),
				topics: vec![selector],
				data: vec![empty_topic(), empty_topic(), empty_topic(), empty_topic()],
				..Default::default()
			})),
		}
	}

	#[rstest]
	fn contribution_created() {
		let apibara_event = apibara_event(selector::<contribution::Created>());

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
	fn contribution_assigned() {
		let apibara_event = apibara_event(selector::<contribution::Assigned>());

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
	fn contribution_unassigned() {
		let apibara_event = apibara_event(selector::<contribution::Unassigned>());

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
	fn contribution_validated() {
		let apibara_event = apibara_event(selector::<contribution::Validated>());

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
