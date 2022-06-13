use crate::{
    model::github::PullRequestStatus,
    starknet::{converter, errors::StarknetError},
};
use anyhow::Result;
use log::debug;
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

pub fn new_starknet_contribution_contract_client(
    private_key: &str,
    contract_address: &str,
) -> ContributionStarknetContractClient {
    let provider = SequencerGatewayProvider::starknet_alpha_goerli();
    let account_provider = SequencerGatewayProvider::starknet_alpha_goerli();

    let signer = LocalWallet::from(SigningKey::from_secret_scalar(
        FieldElement::from_hex_be(private_key).unwrap(),
    ));
    let address = FieldElement::from_hex_be(contract_address).unwrap();
    let contract_address = FieldElement::from_hex_be(contract_address).unwrap();

    // TODO: make chain_id configurable
    let account = SingleOwnerAccount::new(account_provider, signer, address, chain_id::TESTNET);

    ContributionStarknetContractClient::new(contract_address, account, provider)
}

pub struct ContributionStarknetContractClient {
    contract_address: FieldElement,
    account: SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>,
    provider: SequencerGatewayProvider,
}

impl ContributionStarknetContractClient {
    pub fn new(
        contract_address: FieldElement,
        account: SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>,
        provider: SequencerGatewayProvider,
    ) -> Self {
        Self {
            contract_address,
            account,
            provider,
        }
    }
    pub async fn register_contribution(
        &self,
        owner: &str,
        repo: &str,
        author_github_login: std::string::String,
        pr_id: std::string::String,
    ) -> Result<(), StarknetError> {
        debug!(
            "Entering register_contribution with args: {} {} {} {}",
            owner, repo, author_github_login, pr_id
        );
        // TODO: retrieve badge token id from author
        let author_badge_id = "1000";

        let _author_github_login_felt = cairo_short_string_to_felt(&author_github_login)
            .map_err(StarknetError::CairoShortStringToFeltError)?;
        let owner_felt = cairo_short_string_to_felt(owner)
            .map_err(StarknetError::CairoShortStringToFeltError)?;
        let repo_felt = cairo_short_string_to_felt(owner)
            .map_err(StarknetError::CairoShortStringToFeltError)?;

        self.account
            .execute(&[Call {
                to: self.contract_address,
                selector: get_selector_from_name("add_contribution").unwrap(),
                calldata: vec![
                    FieldElement::from_dec_str(author_badge_id).unwrap(), // token_id
                    owner_felt,                                           // owner
                    repo_felt,                                            // repo
                    FieldElement::from_dec_str(&pr_id).unwrap(),          // PR ID
                    converter::to_felt(PullRequestStatus::Merged),        // PR status (merged)
                ],
            }])
            .send()
            .await
            .map_err(StarknetError::TransactionError)?;
        Ok(())
    }
}
