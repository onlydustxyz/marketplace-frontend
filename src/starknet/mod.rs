use std::env;

use anyhow::Result;

pub use starknet::accounts::Account;
use starknet::{
    accounts::SingleOwnerAccount,
    core::{chain_id, types::FieldElement},
    providers::SequencerGatewayProvider,
    signers::{LocalWallet, SigningKey},
};

use crate::domain::*;

mod contract_administrator;
mod domain_implementation;
mod model;
mod registry;

pub use model::*;

pub use contract_administrator::ContractAdministrator;
use registry::Registry;

pub fn make_account_from_env() -> impl Account {
    let private_key = env::var("PRIVATE_KEY").expect("PRIVATE_KEY must be set");
    let account_address = env::var("ACCOUNT_ADDRESS").expect("ACCOUNT_ADDRESS must be set");
    make_account(&private_key, &account_address)
}

fn make_account(
    private_key: &str,
    account_address: &str,
) -> SingleOwnerAccount<SequencerGatewayProvider, LocalWallet> {
    let signer = LocalWallet::from(SigningKey::from_secret_scalar(
        FieldElement::from_hex_be(private_key).unwrap(),
    ));

    // TODO: make chain_id configurable
    SingleOwnerAccount::new(
        sequencer(),
        signer,
        FieldElement::from_hex_be(account_address).unwrap(),
        chain_id::TESTNET,
    )
}

fn nb_transactions_in_batch() -> usize {
    std::env::var("NB_TRX_IN_BATCH")
        .expect("NB_TRX_IN_BATCH should be set")
        .parse::<usize>()
        .expect("invalid value for NB_TRX_IN_BATCH")
}

pub fn contributions_contract_address() -> FieldElement {
    let contributions_contract_address =
        std::env::var("CONTRIBUTIONS_ADDRESS").expect("CONTRIBUTIONS_ADDRESS must be set");
    FieldElement::from_hex_be(&contributions_contract_address)
        .expect("Invalid value for CONTRIBUTIONS_ADDRESS")
}

pub fn sequencer() -> SequencerGatewayProvider {
    SequencerGatewayProvider::starknet_alpha_goerli()
}

pub struct API<'a> {
    registry: Registry,
    oracle: Box<dyn ContributionManager + Sync + Send + 'a>,
    pub nb_transactions_in_batch: usize,
}

impl<'a> API<'a> {
    pub fn new<A: Account + Sync>(account: &'a A) -> Self {
        Self {
            registry: Registry::default(),
            oracle: Box::new(ContractAdministrator::new(
                account,
                contributions_contract_address(),
            )),
            nb_transactions_in_batch: nb_transactions_in_batch(),
        }
    }

    pub async fn execute_actions(&self, actions: &[Action]) -> Result<String> {
        self.oracle.execute_actions(actions, true).await
    }
}
