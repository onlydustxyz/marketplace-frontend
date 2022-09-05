use super::ContractError;
use crate::starknet::sequencer;
use log::{error, info};
use rand::prelude::random;
use starknet::{
	accounts::{single_owner::GetNonceError, Account, AccountCall, Call},
	core::{
		types::{AddTransactionResult, BlockId, FieldElement, InvokeFunctionTransactionRequest},
		utils::get_selector_from_name,
	},
	providers::{Provider, SequencerGatewayProvider},
};
use std::sync::Arc;

pub struct ContractAdministrator<A: Account + Sync> {
	administrator_account: Arc<A>,
	sequencer: SequencerGatewayProvider,
}

impl<A: Account + Sync> ContractAdministrator<A> {
	pub fn new(administrator_account: Arc<A>) -> Self {
		Self {
			administrator_account,
			sequencer: sequencer(),
		}
	}

	pub async fn send_transaction(
		&self,
		calls: &[Call],
	) -> Result<AddTransactionResult, ContractError> {
		info!("Sending transaction with {} calls", calls.len());

		let nonce_key: u64 = random();
		let nonce = self
			.get_2d_nonce(nonce_key.into())
			.await
			.map_err(|error| ContractError::GetNonce(error.to_string()))?;

		match self.administrator_account.execute(calls).nonce(nonce).send().await {
			Ok(transaction_result) => Ok(transaction_result),
			Err(error) => {
				error!("{:?}", error);
				Err(ContractError::SendTransaction(error.to_string()))
			},
		}
	}

	async fn get_2d_nonce(
		&self,
		nonce_key: FieldElement,
	) -> Result<FieldElement, GetNonceError<<SequencerGatewayProvider as Provider>::Error>> {
		let call_result = self
			.sequencer
			.call_contract(
				InvokeFunctionTransactionRequest {
					contract_address: self.administrator_account.address(),
					entry_point_selector: get_selector_from_name("get_nonce").unwrap(),
					calldata: vec![nonce_key],
					signature: vec![],
					max_fee: FieldElement::ZERO,
				},
				BlockId::Latest,
			)
			.await
			.map_err(GetNonceError::ProviderError)?;

		if call_result.result.len() == 1 {
			Ok(call_result.result[0])
		} else {
			Err(GetNonceError::InvalidResponseLength {
				expected: 1,
				actual: call_result.result.len(),
			})
		}
	}
}
