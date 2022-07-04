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

use self::{
    github_oracle::{GithubOracle, Oracle},
    models::ContractUpdateStatus,
    registry::Registry,
};
use crate::{
    model::pullrequest,
    traits::{logger::StreamLogger, Streamable, StreamableResult},
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

fn nb_transactions_in_batch() -> usize {
    std::env::var("NB_TRX_IN_BATCH")
        .expect("NB_TRX_IN_BATCH should be set")
        .parse::<usize>()
        .expect("invalid value for NB_TRX_IN_BATCH")
}

pub struct API<'a> {
    registry: Registry,
    oracle: Box<dyn Oracle + Sync + Send + 'a>,
    nb_transactions_in_batch: usize,
}

impl<'a> API<'a> {
    pub fn new<A: Account + Sync>(account: &'a A) -> Self {
        Self {
            registry: Registry::default(),
            oracle: Box::new(GithubOracle::new(account)),
            nb_transactions_in_batch: nb_transactions_in_batch(),
        }
    }

    async fn next_prs_of_registered_users(
        &self,
        prs: &mut Streamable<'_, pullrequest::PullRequest>,
    ) -> Vec<pullrequest::PullRequest> {
        prs.filter_map(|pr| async {
            if self.registry.is_user_registered(&pr.author).await {
                Some(pr)
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
impl StreamLogger<pullrequest::PullRequest, ContractUpdateStatus> for API<'_> {
    async fn log(
        &self,
        prs: Streamable<'life0, pullrequest::PullRequest>,
    ) -> Result<StreamableResult<'life0, ContractUpdateStatus>> {
        debug!("Logging contributions in smart contract");

        struct State<'a>(
            Streamable<'a, pullrequest::PullRequest>, // stream of contributions to upload
            Option<Result<String>>,                   // Last transaction call result, if any
            Vec<pullrequest::PullRequest>, // contributions sent in previous call for which we need to yield the status
        );

        let init_state = State(prs, None, Vec::new());

        let status_stream = stream::unfold(init_state, |state| async {
            let State(
                mut next_contributions,
                mut last_transaction_result,
                mut contributions_uploaded,
            ) = state;

            loop {
                if let Some(pr) = contributions_uploaded.pop() {
                    // If we have some contributions left to flag, let's use the last call status to do so
                    let result = match last_transaction_result.as_ref().unwrap() {
                        Ok(hash) => Ok(ContractUpdateStatus::new(pr.id, hash.clone())),
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

                // Make the call to the smart contract
                let calls = contributions_to_upload
                    .iter()
                    .map(|pr| self.oracle.make_add_contribution_call(pr))
                    .collect::<Vec<_>>();

                let transaction_result = self
                    .oracle
                    .send_transaction(&calls)
                    .await
                    .map(|res| format!("0x{:x}", res.transaction_hash))
                    .map_err(anyhow::Error::msg);

                last_transaction_result = Some(transaction_result);
                contributions_uploaded = contributions_to_upload;
            }
        });

        Ok(Streamable::Async(status_stream.into()))
    }
}
