use anyhow::{anyhow, Result};
use deathnote_contributions_feeder::repo_analyzer;
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
    repo_analyzer::analyze(&organization, &repository)
        .await
        .map_err(|e| anyhow!(e))
}
