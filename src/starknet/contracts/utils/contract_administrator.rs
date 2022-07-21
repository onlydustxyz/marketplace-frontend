use crate::starknet::sequencer;
use anyhow::{anyhow, Result};
use log::{info, warn};
use starknet::{
	accounts::{Account, Call},
	core::types::{AddTransactionResult, TransactionStatus},
	providers::{Provider, SequencerGatewayProvider},
};
use std::{thread, time::Duration};

pub struct ContractAdministrator<'a, A: Account + Sync> {
	administrator_account: &'a A,
	sequencer: SequencerGatewayProvider,
}

impl<'a, A: Account + Sync> ContractAdministrator<'a, A> {
	pub fn new(administrator_account: &'a A) -> Self {
		Self {
			administrator_account,
			sequencer: sequencer(),
		}
	}

	pub async fn send_transaction(
		&self,
		calls: &[Call],
		wait_for_acceptance: bool,
	) -> Result<AddTransactionResult> {
		info!("Sending transaction with {} calls", calls.len());

		match self.administrator_account.execute(calls).send().await {
			Ok(transaction_result) => match wait_for_acceptance {
				true => self.wait_for_transaction_acceptance(transaction_result).await,
				false => Ok(transaction_result),
			},
			Err(error) => Err(anyhow!(error.to_string())),
		}
	}

	pub async fn wait_for_transaction_acceptance(
		&self,
		transaction_result: AddTransactionResult,
	) -> Result<AddTransactionResult> {
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
				TransactionStatus::Rejected => Err(anyhow!(format!(
					"Transaction rejected: {:?}",
					receipt.transaction_failure_reason
				))),
			};
		}
	}
}
