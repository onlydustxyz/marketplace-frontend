use anyhow::anyhow;
use async_trait::async_trait;
use marketplace_domain::HexPrefixedString;

use crate::{
	domain::BlockchainObserver,
	infrastructure::apibara::{
		proto::Invalidate,
		starknet::{bytes::TryFromBytes, events::*, proto::Block},
	},
};

#[async_trait]
pub trait Observed {
	type Error;
	async fn observed(&self, observer: &dyn BlockchainObserver) -> Result<(), Self::Error>;
}

#[async_trait]
impl Observed for Block {
	type Error = super::Error;

	async fn observed(&self, observer: &dyn BlockchainObserver) -> Result<(), Self::Error> {
		match self {
			Block {
				block_hash: Some(block_hash),
				block_number,
				..
			} => {
				let block_hash = HexPrefixedString::try_from_bytes(block_hash.hash.clone())
					.map_err(Self::Error::Invalid)?;
				Ok(observer.on_new_block(&block_hash, *block_number).await)
			},
			_ => Err(Self::Error::Invalid(anyhow!(
				"Invalid block received in message data"
			))),
		}
	}
}

#[async_trait]
impl Observed for Invalidate {
	type Error = super::Error;

	async fn observed(&self, observer: &dyn BlockchainObserver) -> Result<(), Self::Error> {
		observer.on_reorg().await;
		Ok(())
	}
}

#[async_trait]
impl Observed for Event {
	type Error = super::Error;

	async fn observed(&self, observer: &dyn BlockchainObserver) -> Result<(), Self::Error> {
		match self.clone().try_into() {
			Ok(event) => Ok(observer.on_new_event(&event, self.block_number).await),
			Err(FromEventError::Unsupported) => Ok(()),
			Err(error) => Err(Self::Error::Invalid(anyhow!(error))),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use crate::{
		apibara::starknet::proto::BlockHash,
		domain::{IndexingServiceError, MockBlockchainObserver},
		test::*,
	};
	use assert_matches::assert_matches;
	use mockall::predicate::{always, eq};
	use rstest::*;

	#[fixture]
	fn observer() -> MockBlockchainObserver {
		MockBlockchainObserver::new()
	}

	#[rstest]
	async fn observed_block(mut observer: MockBlockchainObserver) {
		observer
			.expect_on_new_block()
			.with(eq(BLOCK_HASHES[0].as_0x_string()), eq(7654876))
			.once()
			.return_const(());

		let block = Block {
			block_hash: Some(BlockHash {
				hash: BLOCK_HASHES[0].as_felt(),
			}),
			block_number: 7654876,
			..Default::default()
		};
		let result = block.observed(&observer).await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	async fn observed_invalid_block(mut observer: MockBlockchainObserver) {
		observer.expect_on_new_block().never();

		let block = Block::default();

		let result = block.observed(&observer).await;
		assert_matches!(result, Err(IndexingServiceError::Invalid(_)));
	}

	#[rstest]
	async fn observed_reorg(mut observer: MockBlockchainObserver) {
		observer.expect_on_reorg().once().return_const(());

		let invalidate = Invalidate::default();

		let result = invalidate.observed(&observer).await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	async fn observed_event(mut observer: MockBlockchainObserver) {
		observer.expect_on_new_event().with(always(), eq(12345)).once().return_const(());

		let event = Event {
			block_number: 12345,
			selector: vec![
				// ContributionValidated
				3, 97, 80, 67, 51, 128, 124, 244, 120, 46, 227, 66, 29, 151, 102, 18, 42, 1, 41,
				135, 134, 221, 141, 231, 48, 51, 122, 59, 94, 89, 114, 30,
			],
			data: vec![vec![0; 32]].into(),
			..Default::default()
		};

		let result = event.observed(&observer).await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	async fn observed_unsupported_event(mut observer: MockBlockchainObserver) {
		observer.expect_on_new_event().never();

		let event = Event {
			selector: vec![0; 32],
			..Default::default()
		};

		let result = event.observed(&observer).await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}
}
