use anyhow::anyhow;
use async_trait::async_trait;
use marketplace_domain::HexPrefixedString;

use crate::{
	domain::BlockchainObserver,
	infrastructure::apibara::{
		proto::Invalidate,
		starknet::{bytes::TryFromBytes, proto::Block},
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

#[cfg(test)]
mod test {
	use super::*;
	use crate::{
		apibara::starknet::proto::BlockHash,
		domain::{IndexingServiceError, MockBlockchainObserver},
		test::*,
	};
	use assert_matches::assert_matches;
	use mockall::predicate::eq;
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
}
