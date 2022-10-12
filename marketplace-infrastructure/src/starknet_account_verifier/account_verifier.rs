use super::{field_element::TryFromContributorAccount, StarkNetClient};
use async_trait::async_trait;
use log::debug;
use marketplace_domain::{OnChainAccountVerifier, *};
use starknet::{
	core::{
		types::{BlockId, CallFunction, FieldElement},
		utils::get_selector_from_name,
	},
	providers::Provider,
};

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
		account_address: &ContributorAccountAddress,
	) -> Result<(), OnChainAccountVerifierError> {
		let contract_address = FieldElement::try_from_contributor_account_address(
			account_address.clone(),
		)
		.map_err(|e| {
			debug!("{}", e.to_string());
			OnChainAccountVerifierError::Infrastructure(e)
		})?;

		self.sequencer
			.call_contract(
				CallFunction {
					contract_address,
					entry_point_selector: get_selector_from_name(
						&std::env::var("IS_VALID_SIGNATURE_SELECTOR")
							.unwrap_or_else(|_| "is_valid_signature".to_string()),
					)
					.unwrap(),
					calldata: vec![
						signed_data.hash,
						FieldElement::from(2u64),
						signed_data.signature.r,
						signed_data.signature.s,
					],
				},
				BlockId::Latest,
			)
			.await
			.map_err(|e| {
				debug!("{}", e.to_string());
				OnChainAccountVerifierError::Infrastructure(anyhow::Error::from(e))
			})?;

		Ok(())
	}
}
