mod github_identifier;
mod topics;
use topics::*;

use super::apibara::{event::Event as ApibaraEventInner, Event as ApibaraEvent, StarkNetEvent};
use marketplace_domain::*;
use starknet::core::types::FieldElement;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum FromEventError {
	#[error("Unsupported event")]
	Unsupported,
	#[error("Invalid event")]
	Invalid,
}

impl TryFrom<ApibaraEvent> for Event {
	type Error = FromEventError;

	fn try_from(event: ApibaraEvent) -> Result<Self, Self::Error> {
		match event.event {
			Some(ApibaraEventInner::Starknet(StarkNetEvent {
				address: _,
				log_index: _,
				topics,
				data,
			})) => {
				let selector: FieldElement =
					Topics::from(topics).pop_front_as().map_err(|_| Self::Error::Invalid)?;
				match selector {
					_ if selector == github_identifier::selector() => Ok(
						Self::GithubIdentifierRegistered(Topics::from(data).try_into()?),
					),
					_ => Err(Self::Error::Unsupported),
				}
			},
			None => Err(Self::Error::Invalid),
			_ => Err(Self::Error::Unsupported),
		}
	}
}

#[cfg(test)]
mod test {
	use super::{super::apibara::TopicValue, *};
	use rstest::*;

	#[rstest]
	fn github_identifier_registered() {
		let apibara_event = ApibaraEvent {
			event: Some(ApibaraEventInner::Starknet(StarkNetEvent {
				topics: vec![TopicValue {
					value: vec![
						2, 124, 191, 99, 112, 72, 67, 173, 80, 238, 22, 11, 250, 185, 65, 12, 49,
						1, 103, 176, 70, 145, 84, 215, 212, 99, 214, 168, 222, 6, 146, 25,
					],
				}],
				data: vec![
					TopicValue {
						value: vec![
							0, 65, 118, 135, 43, 113, 88, 60, 185, 188, 54, 113, 219, 40, 242, 110,
							127, 66, 106, 124, 7, 100, 97, 58, 8, 56, 187, 153, 239, 55, 58, 166,
						],
					},
					TopicValue {
						value: vec![
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 203,
						],
					},
					TopicValue {
						value: vec![
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0,
						],
					},
					TopicValue {
						value: vec![
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 6, 101, 25, 175,
						],
					},
				],
				..Default::default()
			})),
		};

		Event::try_from(apibara_event).unwrap();
	}
}
