use super::{super::apibara::TopicValue, FromEventError};
use anyhow::anyhow;
use crypto_bigint::{Encoding, Split, U256};
use marketplace_domain::{ContributorId, HexPrefixedString};
use starknet::core::types::FieldElement;
use std::{collections::VecDeque, convert::TryInto};
use thiserror::Error;

#[derive(Default)]
pub struct Topics(VecDeque<TopicValue>);

impl Topics {
	pub fn pop_front(&mut self) -> Option<TopicValue> {
		self.0.pop_front()
	}
}

impl From<Vec<TopicValue>> for Topics {
	fn from(topics: Vec<TopicValue>) -> Self {
		Self(topics.into())
	}
}

#[derive(Debug, Error)]
pub enum TopicError {
	#[error("Missing topic in event")]
	Missing,
	#[error("Invalid topic in event")]
	Invalid,
}

impl From<TopicError> for FromEventError {
	fn from(error: TopicError) -> Self {
		Self::Invalid(anyhow!(error.to_string()))
	}
}

pub trait StarknetTopics<T> {
	fn pop_front_as(&mut self) -> Result<T, TopicError>;
}

impl StarknetTopics<HexPrefixedString> for Topics {
	fn pop_front_as(&mut self) -> Result<HexPrefixedString, TopicError> {
		let value = self.pop_front().ok_or(TopicError::Missing)?.value;
		Ok(value.into())
	}
}

impl StarknetTopics<FieldElement> for Topics {
	fn pop_front_as(&mut self) -> Result<FieldElement, TopicError> {
		let topic: [u8; 32] = self
			.pop_front()
			.ok_or(TopicError::Missing)?
			.value
			.try_into()
			.map_err(|_| TopicError::Invalid)?;

		FieldElement::from_bytes_be(&topic).map_err(|_| TopicError::Invalid)
	}
}

impl StarknetTopics<U256> for Topics {
	fn pop_front_as(&mut self) -> Result<U256, TopicError> {
		let low: FieldElement = self.pop_front_as()?;
		let high: FieldElement = self.pop_front_as()?;

		let (_, low) = U256::from_be_bytes(low.to_bytes_be()).split();
		let (_, high) = U256::from_be_bytes(high.to_bytes_be()).split();
		Ok(U256::from((high, low)))
	}
}

impl StarknetTopics<ContributorId> for Topics {
	fn pop_front_as(&mut self) -> Result<ContributorId, TopicError> {
		let value: U256 = self.pop_front_as()?;
		Ok(ContributorId::from(value))
	}
}

impl StarknetTopics<u128> for Topics {
	fn pop_front_as(&mut self) -> Result<u128, TopicError> {
		let value: FieldElement = self.pop_front_as()?;
		let (_, value) = U256::from_be_bytes(value.to_bytes_be()).split();
		Ok(value.into())
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[fixture]
	fn topics() -> Topics {
		vec![
			TopicValue {
				value: vec![
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 203,
				],
			},
			TopicValue {
				value: vec![
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0,
				],
			},
		]
		.into()
	}

	#[rstest]
	fn topic_to_u256(mut topics: Topics) {
		let value: U256 = topics.pop_front_as().expect("Something went wrong during convertion");
		assert_eq!(U256::from_u128(203), value);
		assert_eq!(0, topics.0.len());
	}

	#[rstest]
	fn topic_to_hex_string(mut topics: Topics) {
		let value: HexPrefixedString =
			topics.pop_front_as().expect("Something went wrong during convertion");
		assert_eq!(HexPrefixedString::from(vec![203]), value);
		assert_eq!(1, topics.0.len());
	}

	#[rstest]
	fn topic_to_u128(mut topics: Topics) {
		let value: u128 = topics.pop_front_as().expect("Something went wrong during convertion");
		assert_eq!(203, value);
		assert_eq!(1, topics.0.len());
	}

	#[rstest]
	fn convertion_error() {
		let mut topics = Topics::default();
		let result: Result<FieldElement, _> = topics.pop_front_as();
		assert!(result.is_err());
	}
}
