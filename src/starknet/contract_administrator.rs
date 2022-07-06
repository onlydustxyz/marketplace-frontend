use anyhow::{anyhow, Result};
use log::info;
use starknet::{
    accounts::{Account, Call},
    core::types::{AddTransactionResult, FieldElement},
};

pub struct ContractAdministrator<'a, A: Account + Sync> {
    contract_address: FieldElement,
    administrator_account: &'a A,
}

impl<'a, A: Account + Sync> ContractAdministrator<'a, A> {
    pub fn new(contract_address: FieldElement, administrator_account: &'a A) -> Self {
        Self {
            contract_address,
            administrator_account,
        }
    }

    pub fn contract_address(&self) -> FieldElement {
        self.contract_address
    }

    pub async fn send_transaction(&self, calls: &[Call]) -> Result<AddTransactionResult> {
        info!("Sending transactions with {} calls", calls.len());

        match self.administrator_account.execute(calls).send().await {
            Ok(transaction_result) => Ok(transaction_result),
            Err(error) => Err(anyhow!(error.to_string())),
        }
    }
}
