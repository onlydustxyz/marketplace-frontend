use crate::{model::*, traits::logger::*};
use anyhow::Result;
use async_trait::async_trait;
use log::info;
use starknet::{
    accounts::{Account, Call, SingleOwnerAccount},
    core::{
        chain_id,
        types::FieldElement,
        utils::{cairo_short_string_to_felt, get_selector_from_name},
    },
    providers::SequencerGatewayProvider,
    signers::{LocalWallet, SigningKey},
};

use self::models::ContractUpdateStatus;

pub mod models;

pub struct API {
    contract_address: FieldElement,
    account: SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>,
}

impl API {
    pub fn new(private_key: &str, account_address: &str, contract_address: &str) -> Self {
        let signer = LocalWallet::from(SigningKey::from_secret_scalar(
            FieldElement::from_hex_be(private_key).unwrap(),
        ));

        // TODO: make chain_id configurable
        let account = SingleOwnerAccount::new(
            SequencerGatewayProvider::starknet_alpha_goerli(),
            signer,
            FieldElement::from_hex_be(account_address).unwrap(),
            chain_id::TESTNET,
        );

        Self {
            contract_address: FieldElement::from_hex_be(contract_address).unwrap(),
            account,
        }
    }
}

#[async_trait]
impl Logger<pullrequest::PullRequest, ContractUpdateStatus> for API {
    async fn log(&self, pr: pullrequest::PullRequest) -> Result<ContractUpdateStatus> {
        info!(
            "Register contribution #{} by {} ({})",
            pr.id, pr.author, pr.status
        );

        let str_to_felt = |value: &String| cairo_short_string_to_felt(&value).unwrap();

        let transaction_result = self
            .account
            .execute(&[Call {
                to: self.contract_address,
                selector: get_selector_from_name("add_contribution_from_handle").unwrap(),
                calldata: vec![
                    FieldElement::from_dec_str(&pr.author).unwrap(), // github identifier
                    str_to_felt(&String::from("")),                  // owner
                    str_to_felt(&pr.repository_id),                  // repo
                    FieldElement::from_dec_str(&pr.id).unwrap(),     // PR ID
                    FieldElement::from_dec_str(&pr.status.to_string()).unwrap(), // PR status (merged)
                ],
            }])
            .send()
            .await?;

        Ok(ContractUpdateStatus::new(
            pr.id.clone(),
            format!("{:x}", transaction_result.transaction_hash),
        ))
    }
}
