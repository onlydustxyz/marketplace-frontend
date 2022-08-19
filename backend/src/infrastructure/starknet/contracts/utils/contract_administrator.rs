use super::ContractError;
use crate::infrastructure::starknet::sequencer;
use log::{info, warn};
use rand::prelude::random;
use starknet::{
	accounts::{single_owner::GetNonceError, Account, AccountCall, Call},
	core::{
		types::{
			AddTransactionResult, BlockId, FieldElement, InvokeFunctionTransactionRequest,
			TransactionStatus,
		},
		utils::get_selector_from_name,
	},
	providers::{Provider, SequencerGatewayProvider},
};
use std::{sync::Arc, thread, time::Duration};

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
		wait_for_acceptance: bool,
	) -> Result<AddTransactionResult, ContractError> {
		info!("Sending transaction with {} calls", calls.len());

		let nonce_key: u64 = random();
		let nonce = self
			.get_2d_nonce(nonce_key.into())
			.await
			.map_err(|error| ContractError::GetNonce(error.to_string()))?;

		match self.administrator_account.execute(calls).nonce(nonce).send().await {
			Ok(transaction_result) => match wait_for_acceptance {
				true => self.wait_for_transaction_acceptance(transaction_result).await,
				false => Ok(transaction_result),
			},
			Err(error) => {
				warn!("{}", error.to_string());
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

	pub async fn wait_for_transaction_acceptance(
		&self,
		transaction_result: AddTransactionResult,
	) -> Result<AddTransactionResult, ContractError> {
		info!(
			"Waiting for transaction 0x{:x} to be accepted",
			transaction_result.transaction_hash
		);

		loop {
			let receipt = match self
				.sequencer
				.get_transaction_status(transaction_result.transaction_hash)
				.await
				.map_err(anyhow::Error::msg)
			{
				Ok(receipt) => receipt,
				Err(e) => {
					warn!("{}", e);
					thread::sleep(Duration::from_secs(3));
					continue;
				},
			};

			info!("Transaction is {:?}", receipt.status);

			break match receipt.status {
				TransactionStatus::NotReceived
				| TransactionStatus::Received
				| TransactionStatus::Pending => {
					thread::sleep(Duration::from_secs(3));
					continue;
				},
				TransactionStatus::AcceptedOnL2 | TransactionStatus::AcceptedOnL1 =>
					Ok(transaction_result),
				TransactionStatus::Rejected => Err(ContractError::TransactionReverted(
					receipt
						.transaction_failure_reason
						.map(|reason| format!("{:?}", reason))
						.unwrap_or_else(|| String::from("Unknown failure")),
				)),
			};
		}
	}
}
