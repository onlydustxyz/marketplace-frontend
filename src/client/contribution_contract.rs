use anyhow::Result;
use log::debug;
use starknet::{
    accounts::{Account, Call, SingleOwnerAccount},
    core::{chain_id, types::FieldElement, utils::get_selector_from_name},
    providers::{Provider, SequencerGatewayProvider},
    signers::{LocalWallet, Signer, SigningKey},
};

pub trait ContributionContractClient {
    fn register_contribution(
        &self,
        owner: &str,
        repo: &str,
        author_github_login: String,
        pr_id: String,
    ) -> Result<()>;
}

pub fn new_starknet_contribution_contract_client(
    private_key: &str,
    contract_address: &str,
) -> impl ContributionContractClient {
    let provider = SequencerGatewayProvider::starknet_alpha_goerli();
    let signer = LocalWallet::from(SigningKey::from_secret_scalar(
        FieldElement::from_hex_be(private_key).unwrap(),
    ));
    let address = FieldElement::from_hex_be(contract_address).unwrap();
    let contract_address = FieldElement::from_hex_be(contract_address).unwrap();

    let account = SingleOwnerAccount::new(provider, signer, address, chain_id::TESTNET);

    ContributionStarknetContractClient::new(contract_address, account)
}

struct ContributionStarknetContractClient<P, S>
where
    P: Provider + Send,
    S: Signer + Send,
{
    contract_address: FieldElement,
    account: SingleOwnerAccount<P, S>,
}

impl<P, S> ContributionStarknetContractClient<P, S>
where
    P: Provider + Send,
    S: Signer + Send,
{
    fn new(contract_address: FieldElement, account: SingleOwnerAccount<P, S>) -> Self {
        Self {
            contract_address,
            account,
        }
    }
}

impl<P, S> ContributionContractClient for ContributionStarknetContractClient<P, S>
where
    P: Provider + Send,
    S: Signer + Send,
{
    fn register_contribution(
        &self,
        owner: &str,
        repo: &str,
        author_github_login: std::string::String,
        pr_id: std::string::String,
    ) -> Result<()> {
        debug!(
            "Entering register_contribution with args: {} {} {} {}",
            owner, repo, author_github_login, pr_id
        );
        let result = self
            .account
            .execute(&[Call {
                to: self.contract_address,
                selector: get_selector_from_name("mint").unwrap(),
                calldata: vec![
                    FieldElement::ZERO, // owner
                    FieldElement::ZERO, // repo
                    FieldElement::ZERO, // author github login
                    FieldElement::ZERO, // PR ID
                ],
            }])
            .send()
            .unwrap();

        dbg!(result);
        Ok(())
    }
}
