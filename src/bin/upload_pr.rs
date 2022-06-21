use anyhow::Result;
use dotenv::dotenv;
use std::env;
use std::rc::Rc;
use std::sync::Arc;

use deathnote_contributions_feeder::{
    database,
    model::pullrequest,
    starknet::{self, models::*},
    traits::{fetcher::Fetcher, logger::Logger},
};

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    dotenv().ok();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let private_key = env::var("PRIVATE_KEY").expect("PRIVATE_KEY must be set");
    let account_address = env::var("ACCOUNT_ADDRESS").expect("ACCOUNT_ADDRESS must be set");
    let contract_address = env::var("METADATA_ADDRESS").expect("METADATA_ADDRESS must be set");

    let database = Rc::new(database::API::new());
    let starknet = Arc::new(starknet::API::new(
        &private_key,
        &account_address,
        &contract_address,
    ));

    let pr_fetcher: Fetcher<pullrequest::Filter, pullrequest::PullRequest> =
        Fetcher::Sync(database.clone());
    let pr_logger: Logger<Vec<pullrequest::PullRequest>, Vec<ContractUpdateStatus>> =
        Logger::Async(starknet.clone());
    let status_logger: Logger<Vec<ContractUpdateStatus>, Vec<()>> = Logger::Sync(database.clone());

    let all = pullrequest::Filter::default(); // TODO filter only non up-to-date PR
    let prs = pr_fetcher.fetch(all).await?;
    let statuses = pr_logger.log(&prs).await?;
    status_logger.log(&statuses).await?;

    Ok(())
}
