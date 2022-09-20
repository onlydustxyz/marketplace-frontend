use async_trait::async_trait;
use starknet::{
	accounts::{Account, AccountCall, Call},
	core::{
		types::{BlockId, FieldElement, InvokeFunctionTransactionRequest},
		utils::get_selector_from_name,
	},
	providers::Provider,
};

use crate::domain::{
	errors::{RegistryError, SignatureError},
	services::onchain_registry::OnChainRegistry,
	value_objects::Identity,
};

use super::starknet_client::StarkNetClient;

/// Stark ECDSA signature
#[derive(Debug, Clone, Copy, Eq, PartialEq, PartialOrd, Ord, Hash)]
pub struct Signature {
	/// The `r` value of a signature
	pub r: FieldElement,
	/// The `s` value of a signature
	pub s: FieldElement,
}

#[derive(Debug, Clone, Copy, Eq, PartialEq, PartialOrd, Ord, Hash)]
pub struct SignedData {
	pub hash: FieldElement,
	pub signature: Signature,
}

// This is need to be able to use a FieldElement as a ContributorId
impl From<Identity> for FieldElement {
	fn from(identity: Identity) -> Self {
		match identity {
			Identity::GitHubId(github_id) => FieldElement::from(github_id.0),
		}
	}
}

#[async_trait]
impl OnChainRegistry for StarkNetClient {
	type AccountAddress = FieldElement;
	type ContributorId = FieldElement;
	type SignedData = SignedData;
	type TransactionHash = FieldElement;

	async fn check_signature(
		&self,
		signed_data: SignedData,
		account_address: Self::AccountAddress,
	) -> Result<(), SignatureError> {
		self.provider
			.call_contract(
				InvokeFunctionTransactionRequest {
					contract_address: account_address,
					entry_point_selector: get_selector_from_name("is_valid_signature").unwrap(),
					calldata: vec![
						signed_data.hash,
						FieldElement::from(2u64),
						signed_data.signature.r,
						signed_data.signature.s,
					],
					signature: vec![],
					max_fee: FieldElement::ZERO,
				},
				BlockId::Latest,
			)
			.await
			.map_err(|e| SignatureError::InvalidSignature(Box::new(e)))?;

		Ok(())
	}

	async fn register_contributor(
		&self,
		user_account_address: Self::AccountAddress,
		user_id: Self::ContributorId,
	) -> Result<Self::TransactionHash, RegistryError> {
		let nonce = self
			.get_2d_nonce(user_id)
			.await
			.map_err(|e| RegistryError::Nonce(Box::new(e)))?;

		self.account
			.execute(&[Call {
				to: self.badge_registry_address,
				selector: get_selector_from_name("register_github_identifier").unwrap(),
				calldata: vec![user_account_address, user_id],
			}])
			.nonce(nonce)
			.send()
			.await
			.map_err(|e| RegistryError::Transaction(Box::new(e)))
			.map(|transaction_result| transaction_result.transaction_hash)
	}
}
