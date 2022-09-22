use async_trait::async_trait;
use marketplace_domain::OnChainAccountVerifier;
use starknet::{
	core::{
		types::{BlockId, FieldElement, InvokeFunctionTransactionRequest},
		utils::get_selector_from_name,
	},
	providers::Provider,
};

use super::{field_element::TryFromContributorAccount, StarkNetClient};
use marketplace_domain::*;

#[derive(Debug, Clone, Copy, Eq, PartialEq, PartialOrd, Ord, Hash)]
pub struct SignedData {
	pub hash: FieldElement,
	pub signature: Signature,
}

/// Stark ECDSA signature
#[derive(Debug, Clone, Copy, Eq, PartialEq, PartialOrd, Ord, Hash)]
pub struct Signature {
	/// The `r` value of a signature
	pub r: FieldElement,
	/// The `s` value of a signature
	pub s: FieldElement,
}

#[async_trait]
impl OnChainAccountVerifier for StarkNetClient {
	type SignedData = SignedData;

	async fn check_signature(
		&self,
		signed_data: &Self::SignedData,
		account_address: &ContributorAccount,
	) -> Result<(), OnChainAccountVerifierError> {
		let contract_address = FieldElement::try_from_contributor_account(account_address.clone())
			.map_err(OnChainAccountVerifierError::Infrastructure)?;

		self.sequencer
			.call_contract(
				InvokeFunctionTransactionRequest {
					contract_address,
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
			.map_err(|e| OnChainAccountVerifierError::Infrastructure(anyhow::Error::from(e)))?;

		Ok(())
	}
}
