use anyhow::Result;
use async_trait::async_trait;

use log::debug;
pub use starknet::accounts::Account;
use starknet::{
    accounts::SingleOwnerAccount,
    core::{chain_id, types::FieldElement},
    providers::SequencerGatewayProvider,
    signers::{LocalWallet, SigningKey},
};

use self::{
    github_oracle::{GithubOracle, Oracle},
    models::ContractUpdateStatus,
    registry::Registry,
};
use crate::{
    model::pullrequest,
    traits::Logger,
};

mod github_oracle;
pub mod models;
mod registry;

pub fn make_account(private_key: &str, account_address: &str) -> impl Account {
    let signer = LocalWallet::from(SigningKey::from_secret_scalar(
        FieldElement::from_hex_be(private_key).unwrap(),
    ));

    // TODO: make chain_id configurable
    SingleOwnerAccount::new(
        SequencerGatewayProvider::starknet_alpha_goerli(),
        signer,
        FieldElement::from_hex_be(account_address).unwrap(),
        chain_id::TESTNET,
    )
}

}

pub struct API<'a> {
    registry: Registry,
    oracle: Box<dyn Oracle + Sync + Send + 'a>,
}

impl<'a> API<'a> {
    pub fn new<A: Account + Sync>(account: &'a A) -> Self {
        Self {
            registry: Registry::default(),
            oracle: Box::new(GithubOracle::new(account)),
        }
    }

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
