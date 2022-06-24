use anyhow::Result;
use dotenv::dotenv;
use futures::stream::StreamExt;
use log::warn;
use std::env;

use deathnote_contributions_feeder::{
    database,
    model::pullrequest,
    starknet,
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

    let database = database::API::new();
    let starknet = starknet::API::new(&private_key, &account_address, &contract_address);

    let all = pullrequest::Filter::default(); // TODO filter only non up-to-date PR

    database
        .fetch(all)
        .await?
        .for_each(|pr| async {
            match starknet.log(pr).await {
                Ok(status) => {
                    database
                        .log(status)
                        .await
                        .expect("Cannot update success status for PR");
                }
                Err(error) => {
                    warn!("{}", error);
                }
            };
        })
        .await;

    Ok(())
}
