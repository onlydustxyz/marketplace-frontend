use super::{Bytes, FromEventError};
use anyhow::anyhow;
use crypto_bigint::{Encoding, U256};
use marketplace_domain::{AccountAddress, HexPrefixedString};
use starknet::core::types::FieldElement;
use std::collections::VecDeque;
use thiserror::Error;

#[derive(Clone)]
#[cfg_attr(test, derive(Default, Debug, PartialEq, Eq))]
pub struct Topics(VecDeque<Bytes>);

impl Topics {
	pub fn pop_front(&mut self) -> Option<Bytes> {
		self.0.pop_front()
	}
}

impl From<Vec<Bytes>> for Topics {
	fn from(topics: Vec<Bytes>) -> Self {
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
		let value = self.pop_front().ok_or(TopicError::Missing)?;
		Ok(value.into())
	}
}

impl StarknetTopics<FieldElement> for Topics {
	fn pop_front_as(&mut self) -> Result<FieldElement, TopicError> {
		let topic: [u8; 32] = self
			.pop_front()
			.ok_or(TopicError::Missing)?
			.try_into()
			.map_err(|_| TopicError::Invalid)?;

		FieldElement::from_bytes_be(&topic).map_err(|_| TopicError::Invalid)
	}
}

impl StarknetTopics<AccountAddress> for Topics {
	fn pop_front_as(&mut self) -> Result<AccountAddress, TopicError> {
		let value: HexPrefixedString = self.pop_front_as()?;
		Ok(AccountAddress::from(value))
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
			vec![
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 203,
			],
			vec![
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0,
			],
		]
		.into()
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
