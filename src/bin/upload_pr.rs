use anyhow::Result;
use dotenv::dotenv;
use futures::future::join_all;
use log::info;
use std::env;
use std::rc::Rc;
use std::sync::Arc;

use deathnote_contributions_feeder::{
    database,
    model::pullrequest,
    services::contributions::fetch_and_log,
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
    let pr_logger: Logger<pullrequest::PullRequest, Result<ContractUpdateStatus>> =
        Logger::Async(starknet.clone());
    let status_logger: Logger<ContractUpdateStatus, Result<()>> = Logger::Sync(database.clone());

    let all = pullrequest::Filter::default(); // TODO filter only non up-to-date PR
    let statuses = fetch_and_log(pr_fetcher, pr_logger, all).await?;
    info!(
        "Logged {}/{} pull requests successfully",
        statuses.iter().filter(|res| res.is_ok()).count(),
        statuses.len()
    );

    join_all(
        statuses
            .into_iter()
            .filter_map(|status| status.ok())
            .map(|status| status_logger.log(status)),
    )
    .await;

    Ok(())
}
