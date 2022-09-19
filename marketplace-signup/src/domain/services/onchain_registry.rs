use async_trait::async_trait;
use std::str::FromStr;

use crate::domain::{
	errors::{RegistryError, SignatureError},
	value_objects::Identity,
};

#[async_trait]
pub trait OnChainRegistry: Send + Sync {
	type SignedData: Clone + Send + Sync;
	type AccountAddress: Clone + Send + Sync;
	type TransactionHash: FromStr + Clone + Send + Sync;
	type ContributorId: From<Identity> + Send + Sync;

	async fn check_signature(
		&self,
		signed_data: Self::SignedData,
		account_address: Self::AccountAddress,
	) -> Result<(), SignatureError>;

	async fn register_contributor(
		&self,
		user_account_address: Self::AccountAddress,
		user_id: Self::ContributorId,
	) -> Result<Self::TransactionHash, RegistryError>;
}
