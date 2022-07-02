use std::env;

use crate::{model::*, traits::logger::*};
use anyhow::{anyhow, Result};
use async_trait::async_trait;
use log::info;
use starknet::{
    accounts::{Account, Call, SingleOwnerAccount},
    core::{
        chain_id,
        types::FieldElement,
        utils::{cairo_short_string_to_felt, get_selector_from_name},
    },
    providers::{
        jsonrpc::{
            models::{BlockHashOrTag, BlockTag, FunctionCall},
            HttpTransport, JsonRpcClient,
        },
        SequencerGatewayProvider,
    },
    signers::{LocalWallet, SigningKey},
};
use url::Url;

use self::models::ContractUpdateStatus;

pub mod models;

pub struct API {
    oracle_contract_address: FieldElement,
    registry_contract_address: FieldElement,
    account: SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>,
    client: JsonRpcClient<HttpTransport>,
}

impl API {
    pub fn new(
        private_key: &str,
        account_address: &str,
        oracle_contract_address: &str,
        registry_contract_address: &str,
    ) -> Self {
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
            oracle_contract_address: FieldElement::from_hex_be(oracle_contract_address).unwrap(),
            registry_contract_address: FieldElement::from_hex_be(registry_contract_address)
                .unwrap(),
            account,
            client: JsonRpcClient::new(HttpTransport::new(json_rpc_uri())),
        }
    }
}

fn json_rpc_uri() -> Url {
    Url::parse(&env::var("JSON_RPC_URI").expect("JSON_RPC_URI must be set"))
        .expect("Invalid JSON_RPC_URI")
}

impl API {
    fn make_call(&self, selector: &str, pr: &pullrequest::PullRequest) -> Call {
        Call {
            to: self.oracle_contract_address,
            selector: get_selector_from_name(selector).unwrap(),
            calldata: make_call_data(pr),
        }
    }

    // TODO: Turn this function into get_user_information and use it as filter_map
    async fn is_user_registered(&self, user: &str) -> bool {
        self.client
            .call(
                &FunctionCall {
                    contract_address: self.registry_contract_address,
                    entry_point_selector: get_selector_from_name(
                        "get_user_information_from_github_handle",
                    )
                    .unwrap(),
                    calldata: vec![FieldElement::from_dec_str(&user).unwrap()],
                },
                &BlockHashOrTag::Tag(BlockTag::Latest),
            )
            .await
            .is_ok()
    }

    async fn send_contribution(
        &self,
        pr: pullrequest::PullRequest,
    ) -> Result<ContractUpdateStatus> {
        info!(
            "Register contribution #{} by {} ({})",
            pr.id, pr.author, pr.status
        );

        let transaction_result = self
            .account
            .execute(&[self.make_call("add_contribution_from_handle", &pr)])
            .send()
            .await?;

        Ok(ContractUpdateStatus::new(
            pr.id.clone(),
            format!("{:x}", transaction_result.transaction_hash),
        ))
    }
}

fn make_call_data(pr: &pullrequest::PullRequest) -> Vec<FieldElement> {
    let str_to_felt = |value: &String| cairo_short_string_to_felt(&value).unwrap();

    vec![
        FieldElement::from_dec_str(&pr.author).unwrap(), // github identifier
        str_to_felt(&String::from("")),                  // owner
        str_to_felt(&pr.repository_id),                  // repo
        FieldElement::from_dec_str(&pr.id).unwrap(),     // PR ID
        FieldElement::from_dec_str(&pr.status.to_string()).unwrap(), // PR status (merged)
    ]
}

#[async_trait]
impl Logger<pullrequest::PullRequest, ContractUpdateStatus> for API {
    async fn log(&self, pr: pullrequest::PullRequest) -> Result<ContractUpdateStatus> {
        match self.is_user_registered(&pr.author).await {
            true => self.send_contribution(pr).await,
            false => Err(anyhow!("User {} not registered", &pr.author)),
        }
    }
}
