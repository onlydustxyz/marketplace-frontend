use anyhow::Result;
use log::debug;
pub trait ContributionContractClient {
    fn register_contribution(
        &self,
        owner: &str,
        repo: &str,
        author_github_login: String,
        pr_id: String,
    ) -> Result<()>;
}

pub fn new_starknet_contribution_contract_client() -> impl ContributionContractClient {
    ContributionStarknetContractClient::new()
}

struct ContributionStarknetContractClient {}

impl ContributionStarknetContractClient {
    fn new() -> Self {
        Self {}
    }
}

impl ContributionContractClient for ContributionStarknetContractClient {
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
        Ok(())
    }
}
