use std::{thread, time::Duration};

use anyhow::{anyhow, Result};
use log::{info, warn};
use starknet::{
    accounts::{Account, Call},
    core::types::{AddTransactionResult, FieldElement, TransactionStatus},
    providers::{Provider, SequencerGatewayProvider},
};

use super::sequencer;

pub struct ContractAdministrator<'a, A: Account + Sync> {
    contract_address: FieldElement,
    administrator_account: &'a A,
    sequencer: SequencerGatewayProvider,
}

impl<'a, A: Account + Sync> ContractAdministrator<'a, A> {
    pub fn new(administrator_account: &'a A, contract_address: FieldElement) -> Self {
        Self {
            contract_address,
            administrator_account,
            sequencer: sequencer(),
        }
    }

    pub fn contract_address(&self) -> FieldElement {
        self.contract_address
    }

    pub async fn send_transaction(
        &self,
        calls: &[Call],
        wait_for_acceptance: bool,
    ) -> Result<AddTransactionResult> {
        info!("Sending transactions with {} calls", calls.len());

        match self.administrator_account.execute(calls).send().await {
            Ok(transaction_result) => match wait_for_acceptance {
                true => {
                    self.wait_for_transaction_acceptance(transaction_result)
                        .await
                }
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
                }
            };

            info!("Transaction is {:?}", receipt.status);

            break match receipt.status {
                TransactionStatus::NotReceived
                | TransactionStatus::Received
                | TransactionStatus::Pending => {
                    thread::sleep(Duration::from_secs(3));
                    continue;
                }
                TransactionStatus::AcceptedOnL2 | TransactionStatus::AcceptedOnL1 => {
                    Ok(transaction_result)
                }
                TransactionStatus::Rejected => Err(anyhow!("Transaction rejected")),
            };
        }
    }
}
