use anyhow::{anyhow, Result};
use deathnote_contributions_feeder::client::contribution_contract;
use deathnote_contributions_feeder::services::contribution::RepoAnalyzer;

use std::env;

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let args: Vec<String> = env::args().collect();
    if args.len() != 3 {
        panic!("Invalid arguments.");
    }
    let organization = args[1].clone();
    let repository = args[2].clone();
    let private_key = "";
    let contract_address = "";
    let contribution_contract_client =
        contribution_contract::new_starknet_contribution_contract_client(
            private_key,
            contract_address,
        );
    let repo_analyzer = RepoAnalyzer::new(contribution_contract_client);
    repo_analyzer
        .analyze(&organization, &repository)
        .await
        .map_err(|e| anyhow!(e))
}
