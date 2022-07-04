use anyhow::Result;
use dotenv::dotenv;
use futures::stream::StreamExt;
use log::warn;
use std::env;

use deathnote_contributions_feeder::{
    database,
    model::pullrequest,
    starknet,
    traits::{fetcher::Fetcher, logger::Logger, logger::StreamLogger},
};

fn make_account() -> impl starknet::Account {
    let private_key = env::var("PRIVATE_KEY").expect("PRIVATE_KEY must be set");
    let account_address = env::var("ACCOUNT_ADDRESS").expect("ACCOUNT_ADDRESS must be set");
    starknet::make_account(&private_key, &account_address)
}

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    dotenv().ok();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let database = database::API::default();

    let account = make_account();
    let starknet = starknet::API::new(&account);

    let all = pullrequest::Filter::default(); // TODO filter only non up-to-date PR

    let prs = database.fetch(all).await?;

    let contract_statuses = starknet.log(prs).await?;

    contract_statuses
        .for_each(|status| async {
            match status {
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
