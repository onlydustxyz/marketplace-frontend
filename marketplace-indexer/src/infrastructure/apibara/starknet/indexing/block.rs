use crate::infrastructure::apibara::starknet::{
	proto::{Block, BlockHash, Event as ApibaraEvent, TransactionReceipt},
	Event, TryFromBytes,
};
use anyhow::anyhow;
use chrono::NaiveDateTime;
use marketplace_domain::HexPrefixedString;
use prost::Message;
use prost_types::{Any, Timestamp};

pub trait TryIntoBlock {
	type Error;
	fn try_into_block(self) -> Result<Block, Self::Error>;
}

impl TryIntoBlock for Any {
	type Error = super::Error;

	fn try_into_block(self) -> Result<Block, Self::Error> {
		match self.type_url {
			url if url == "type.googleapis.com/apibara.starknet.v1alpha1.Block" =>
				Block::decode(self.value.as_slice())
					.map_err(anyhow::Error::msg)
					.map_err(Self::Error::Invalid),
			_ => Err(Self::Error::Invalid(anyhow!(
				"Invalid type_url received in message data"
			))),
		}
	}
}

pub trait AsEvents {
	type Error;
	fn as_events(self) -> Result<Vec<Event>, Self::Error>;
}

impl AsEvents for Block {
	type Error = super::Error;

	fn as_events(self) -> Result<Vec<Event>, Self::Error> {
		match self {
			Block {
				block_hash: Some(block_hash),
				timestamp: Some(timestamp),
				..
			} => self.transaction_receipts.into_iter().try_fold(Vec::new(), |events, receipt| {
				receipt.events.clone().into_iter().enumerate().try_fold(
					events,
					|events, (index, event)| {
						let event = build_event(&block_hash, &timestamp, &receipt, event, index)?;
						Ok([events, vec![event]].concat())
					},
				)
			}),

			_ => Err(Self::Error::Invalid(anyhow!(
				"Invalid block received in message data"
			))),
		}
	}
}

fn build_event(
	block_hash: &BlockHash,
	block_timestamp: &Timestamp,
	transaction_receipt: &TransactionReceipt,
	event: ApibaraEvent,
	index: usize,
) -> Result<Event, super::Error> {
	let event = Event {
		block_hash: HexPrefixedString::try_from_bytes(block_hash.hash.clone())
			.map_err(super::Error::Invalid)?,
		block_timestamp: NaiveDateTime::from_timestamp(
			block_timestamp.seconds,
			block_timestamp.nanos as u32,
		),
		transaction_hash: HexPrefixedString::try_from_bytes(
			transaction_receipt.transaction_hash.clone(),
		)
		.map_err(super::Error::Invalid)?,
		index,
		from_address: HexPrefixedString::try_from_bytes(event.from_address)
			.map_err(super::Error::Invalid)?,
		selector: event.keys[0].clone(),
		data: event.data.into(),
	};

	Ok(event)
}

#[cfg(test)]
mod test {
	use super::*;
	use crate::test::*;
	use chrono::NaiveDate;
	use rstest::*;
	use std::error::Error;

	#[fixture]
	fn now() -> NaiveDateTime {
		NaiveDate::from_ymd(2022, 9, 19).and_hms(10, 0, 3)
	}

	#[fixture]
	fn block(now: NaiveDateTime) -> Block {
		Block {
			block_hash: Some(BlockHash {
				hash: BLOCK_HASHES[0].as_felt(),
			}),
			timestamp: Some(Timestamp {
				seconds: now.timestamp(),
				nanos: 0,
			}),
			transaction_receipts: vec![
				TransactionReceipt {
					transaction_hash: TRANSACTION_HASHES[0].as_felt(),
					events: vec![
						ApibaraEvent {
							from_address: CONTRACT_ADDRESSES[0].as_felt(),
							keys: vec![SELECTORS[0].as_felt()],
							data: vec![vec![11, 11, 11], vec![22, 22, 22]],
						},
						ApibaraEvent {
							from_address: CONTRACT_ADDRESSES[1].as_felt(),
							keys: vec![SELECTORS[1].as_felt()],
							data: vec![vec![11, 11], vec![22, 22]],
						},
					],
					..Default::default()
				},
				TransactionReceipt {
					transaction_hash: TRANSACTION_HASHES[1].as_felt(),
					events: vec![ApibaraEvent {
						from_address: CONTRACT_ADDRESSES[1].as_felt(),
						keys: vec![SELECTORS[2].as_felt()],
						data: vec![vec![11, 33], vec![22, 33]],
					}],
					..Default::default()
				},
			],
			..Default::default()
		}
	}

	#[rstest]
	fn create_events_from_block(block: Block) {
		let result = block.as_events();
		assert!(
			result.is_ok(),
			"{}: {:?}",
			result.as_ref().err().unwrap(),
			result.as_ref().err().unwrap().source()
		);

		assert_eq!(
			result.unwrap(),
			vec![
				Event {
					block_hash: BLOCK_HASHES[0].as_0x_string(),
					block_timestamp: now(),
					transaction_hash: TRANSACTION_HASHES[0].as_0x_string(),
					from_address: CONTRACT_ADDRESSES[0].as_0x_string(),
					selector: SELECTORS[0].as_felt(),
					index: 0,
					data: vec![vec![11, 11, 11], vec![22, 22, 22]].into(),
				},
				Event {
					block_hash: BLOCK_HASHES[0].as_0x_string(),
					block_timestamp: now(),
					transaction_hash: TRANSACTION_HASHES[0].as_0x_string(),
					from_address: CONTRACT_ADDRESSES[1].as_0x_string(),
					selector: SELECTORS[1].as_felt(),
					index: 1,
					data: vec![vec![11, 11], vec![22, 22]].into(),
				},
				Event {
					block_hash: BLOCK_HASHES[0].as_0x_string(),
					block_timestamp: now(),
					transaction_hash: TRANSACTION_HASHES[1].as_0x_string(),
					from_address: CONTRACT_ADDRESSES[1].as_0x_string(),
					selector: SELECTORS[2].as_felt(),
					index: 0,
					data: vec![vec![11, 33], vec![22, 33]].into(),
				}
			]
		);
	}
}
