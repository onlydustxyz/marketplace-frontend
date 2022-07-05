use anyhow::{anyhow, Result};
use async_trait::async_trait;
use log::info;
use starknet::{
    accounts::{Account, Call},
    core::{
        types::{AddTransactionResult, FieldElement},
        utils::{cairo_short_string_to_felt, get_selector_from_name},
    },
};

use crate::domain::*;

pub struct GithubOracle<'a, A: Account + Sync> {
    account: &'a A,
}

fn oracle_contract_address() -> FieldElement {
    let registry_contract_address =
        std::env::var("METADATA_ADDRESS").expect("METADATA_ADDRESS must be set");
    FieldElement::from_hex_be(&registry_contract_address)
        .expect("Invalid value for METADATA_ADDRESS")
}

impl<'a, A: Account + Sync> GithubOracle<'a, A> {
    pub fn new(account: &'a A) -> Self {
        Self { account }
    }

    async fn send_transaction<C: Into<Call> + Clone>(
        &self,
        calls: &[C],
    ) -> Result<AddTransactionResult> {
        let calls: Vec<Call> = calls.iter().cloned().map(|call| call.into()).collect();

        match self.account.execute(&calls).send().await {
            Ok(transaction_result) => Ok(transaction_result),
            Err(error) => Err(anyhow!(error.to_string())),
        }
    }
}

#[async_trait]
impl<'a, A: Account + Sync> Oracle for GithubOracle<'a, A> {
    async fn add_contributions<'life1>(
        &self,
        contributions: &'life1 [Contribution],
    ) -> Result<String> {
        info!("Registering {} contributions", contributions.len());

        // Make the call to the smart contract
        let calls: Vec<AddContributionCall> = contributions
            .iter()
            .map(AddContributionCall::from)
            .collect();

        let transaction_hash = self
            .send_transaction(&calls)
            .await
            .map_err(anyhow::Error::msg)?
            .transaction_hash;

        Ok(format!("0x{:x}", transaction_hash))
    }
}

#[derive(Clone)]
struct AddContributionCall {
    github_user_id: FieldElement,
    github_project_id: FieldElement,
    github_pr_id: FieldElement,
    github_pr_status: FieldElement,
}

impl From<&Contribution> for AddContributionCall {
    fn from(contribution: &Contribution) -> Self {
        Self {
            github_user_id: FieldElement::from_dec_str(&contribution.author).unwrap(),
            github_project_id: cairo_short_string_to_felt(&contribution.project_id).unwrap(),
            github_pr_id: FieldElement::from_dec_str(&contribution.id).unwrap(),
            github_pr_status: FieldElement::from_dec_str(&contribution.status.to_string()).unwrap(),
        }
    }
}

impl From<AddContributionCall> for Call {
    fn from(call: AddContributionCall) -> Self {
        Self {
            to: oracle_contract_address(),
            selector: get_selector_from_name("add_contribution_from_handle").unwrap(),
            calldata: vec![
                call.github_user_id,
                FieldElement::ZERO,
                call.github_project_id,
                call.github_pr_id,
                call.github_pr_status,
            ],
        }
    }
}
