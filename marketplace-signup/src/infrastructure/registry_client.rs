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

#[rocket::async_trait]
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

#[cfg(test)]
mod tests {

	use dotenv::dotenv;
	use rand::prelude::*;
	use rocket::tokio;
	use starknet::core::types::FieldElement;

	use crate::{
		domain::{errors::SignatureError, services::onchain_registry::OnChainRegistry},
		infrastructure::{
			registry_client::{Signature, SignedData},
			starknet_client::{StarkNetChain, StarkNetClient},
		},
	};

	const ANYONE_TEST_ACCOUNT: &str =
		"0x65f1506b7f974a1355aeebc1314579326c84a029cd8257a91f82384a6a0ace";

	const REGISTRY_ADDRESS: &str = "";

	const HASH: &str = "0x287b943b1934949486006ad63ac0293038b6c818b858b09f8e0a9da12fc4074";
	const SIGNATURE_R: &str = "0xde4d49b21dd8714eaf5a1b480d8ede84d2230d1763cfe06762d8a117493bcd";
	const SIGNATURE_S: &str = "0x4b61402b98b29a34bd4cba8b5eabae840809914160002385444059f59449a4";
	const BAD_SIGNATURE_R: &str =
		"0x000049b21dd8714eaf5a1b480d8ede84d2230d1763cfe06762d8a117490000";

	fn new_test_client() -> StarkNetClient {
		dotenv().ok();
		let admin_account = std::env::var("STARKNET_ACCOUNT").unwrap();
		let admin_private_key = std::env::var("STARKNET_PRIVATE_KEY").unwrap();

		StarkNetClient::new(
			admin_account.as_str(),
			admin_private_key.as_str(),
			REGISTRY_ADDRESS,
			StarkNetChain::Testnet,
		)
	}

	#[ignore]
	#[tokio::test]
	async fn check_signature_is_valid() {
		let client = new_test_client();

		let address = FieldElement::from_hex_be(ANYONE_TEST_ACCOUNT).unwrap();
		let hash = FieldElement::from_hex_be(HASH).unwrap();
		let signature_r = FieldElement::from_hex_be(SIGNATURE_R).unwrap();
		let signature_s = FieldElement::from_hex_be(SIGNATURE_S).unwrap();

		let result = client
			.check_signature(
				SignedData {
					hash,
					signature: Signature {
						r: signature_r,
						s: signature_s,
					},
				},
				address,
			)
			.await;

		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[ignore]
	#[tokio::test]
	async fn check_signature_is_not_valid() {
		let client = new_test_client();

		let address = FieldElement::from_hex_be(ANYONE_TEST_ACCOUNT).unwrap();
		let hash = FieldElement::from_hex_be(HASH).unwrap();
		let signature_r = FieldElement::from_hex_be(BAD_SIGNATURE_R).unwrap();
		let signature_s = FieldElement::from_hex_be(SIGNATURE_S).unwrap();

		let result = client
			.check_signature(
				SignedData {
					hash,
					signature: Signature {
						r: signature_r,
						s: signature_s,
					},
				},
				address,
			)
			.await;

		assert!(&result.is_err());
		match result.err().unwrap() {
			SignatureError::InvalidSignature(e) => {
				assert!(e.to_string().contains("is invalid, with respect to the public key"))
			},
		}
	}

	#[ignore]
	#[tokio::test]
	async fn register_contributor() {
		let client = new_test_client();

		// use very high ids to avoid any conflict with real github ids
		let user_id: u64 = std::u64::MAX - rand::thread_rng().gen_range(1_000..1_000_000_000);
		let user_address = FieldElement::from(user_id - 42);

		let result = client.register_contributor(user_address, FieldElement::from(user_id)).await;
		assert!(result.is_ok(), "{:#?}", result.err().unwrap());

		let acceptance_result = client.wait_for_transaction_acceptance(result.unwrap()).await;
		assert!(acceptance_result.is_ok());
	}

	#[ignore]
	#[tokio::test]
	async fn register_multiple_user_concurrently() {
		let client = new_test_client();

		// use very high ids to avoid any conflict with real github ids
		let mut user_id: u64 = std::u64::MAX - rand::thread_rng().gen_range(1_000..1_000_000_000);

		let mut transactions = Vec::new();

		for _ in 0..5 {
			let user_address = FieldElement::from(user_id - 42);
			let transaction_result =
				client.register_contributor(user_address, FieldElement::from(user_id)).await;
			assert!(
				transaction_result.is_ok(),
				"{:#?}",
				transaction_result.err().unwrap()
			);
			transactions.push(transaction_result.unwrap());
			user_id += 1;
		}

		for transaction in transactions {
			let acceptance_result = client.wait_for_transaction_acceptance(transaction).await;
			assert!(acceptance_result.is_ok());
		}
	}
}
