use anyhow::{anyhow, Result};
use deathnote_contributions_feeder::services::contribution::RepoAnalyzer;
use deathnote_contributions_feeder::starknet::contribution_contract;

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let private_key = "";
    let contract_address = "";
    let contribution_contract_client =
        contribution_contract::new_starknet_contribution_contract_client(
            private_key,
            contract_address,
        );
    let repo_analyzer = RepoAnalyzer::new(contribution_contract_client);
    repo_analyzer.analyze_all().await.map_err(|e| anyhow!(e))
}
