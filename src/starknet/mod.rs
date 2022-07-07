use std::env;

use anyhow::Result;
use async_trait::async_trait;
use futures::stream::{self, StreamExt};

use log::debug;
pub use starknet::accounts::Account;
use starknet::{
    accounts::SingleOwnerAccount,
    core::{chain_id, types::FieldElement},
    providers::SequencerGatewayProvider,
    signers::{LocalWallet, SigningKey},
};

use crate::{
    domain::*,
    utils::stream::{Streamable, StreamableResult},
};

mod contract_administrator;
mod domain_implementation;
mod registry;

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

pub fn oracle_contract_address() -> FieldElement {
    let registry_contract_address =
        std::env::var("METADATA_ADDRESS").expect("METADATA_ADDRESS must be set");
    FieldElement::from_hex_be(&registry_contract_address)
        .expect("Invalid value for METADATA_ADDRESS")
}

pub fn sequencer() -> SequencerGatewayProvider {
    SequencerGatewayProvider::starknet_alpha_goerli()
}

pub struct API<'a> {
    registry: Registry,
    oracle: Box<dyn ContributionManager + Sync + Send + 'a>,
    nb_transactions_in_batch: usize,
}

impl<'a> API<'a> {
    pub fn new<A: Account + Sync>(account: &'a A) -> Self {
        Self {
            registry: Registry::default(),
            oracle: Box::new(ContractAdministrator::new(
                account,
                oracle_contract_address(),
            )),
            nb_transactions_in_batch: nb_transactions_in_batch(),
        }
    }

    async fn next_prs_of_registered_users(
        &self,
        prs: &mut Streamable<'_, Contribution>,
    ) -> Vec<Contribution> {
        prs.filter_map(|contribution| async {
            if self.registry.is_user_registered(&contribution.author).await {
                Some(contribution)
            } else {
                None
            }
        })
        .take(self.nb_transactions_in_batch)
        .collect::<Vec<_>>()
        .await
    }
}

#[async_trait]
impl StreamLogger<Contribution, ContractUpdateStatus> for API<'_> {
    async fn log(
        &self,
        prs: Streamable<'life0, Contribution>,
    ) -> Result<StreamableResult<'life0, ContractUpdateStatus>> {
        debug!("Logging contributions in smart contract");

        struct State<'a>(
            Streamable<'a, Contribution>, // stream of contributions to upload
            Option<Result<String>>,       // Last transaction call result, if any
            Vec<Contribution>, // contributions sent in previous call for which we need to yield the status
        );

        let init_state = State(prs, None, Vec::new());

        let status_stream = stream::unfold(init_state, |state| async {
            let State(
                mut next_contributions,
                mut last_transaction_result,
                mut contributions_uploaded,
            ) = state;

            loop {
                if let Some(contribution) = contributions_uploaded.pop() {
                    // If we have some contributions left to flag, let's use the last call status to do so
                    let result = match last_transaction_result.as_ref().unwrap() {
                        Ok(hash) => Ok(ContractUpdateStatus::new(contribution.id, hash.clone())),
                        Err(error) => Err(anyhow::Error::msg(error.to_string())),
                    };

                    break Some((
                        result,
                        State(
                            next_contributions,
                            last_transaction_result,
                            contributions_uploaded,
                        ),
                    ));
                }

                // No more current PRs, let's find the next candidates
                let contributions_to_upload = self
                    .next_prs_of_registered_users(&mut next_contributions)
                    .await;

                if contributions_to_upload.is_empty() {
                    // No more candidate contribution to upload, we're done
                    break None;
                }

                let transaction_result = self
                    .oracle
                    .add_contributions(&contributions_to_upload)
                    .await;

                last_transaction_result = Some(transaction_result);
                contributions_uploaded = contributions_to_upload;
            }
        });

        Ok(Streamable::Async(status_stream.into()))
    }
}
