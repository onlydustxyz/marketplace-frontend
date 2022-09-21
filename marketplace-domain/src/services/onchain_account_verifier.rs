use crate::ContributorAccount;
use async_trait::async_trait;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Infrastructure(anyhow::Error),
}

#[async_trait]
pub trait OnChainAccountVerifier: Send + Sync {
	type SignedData: Clone + Send + Sync;

	async fn check_signature(
		&self,
		signed_data: &Self::SignedData,
		account_address: &ContributorAccount,
	) -> Result<(), Error>;
}
