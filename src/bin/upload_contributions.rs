use anyhow::Result;
use dotenv::dotenv;
use futures::stream::StreamExt;
use log::warn;

use deathnote_contributions_feeder::{
    database,
    domain::*,
    starknet::{self, make_account_from_env},
};

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    dotenv().ok();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let database = database::API::default();

    let account = make_account_from_env();
    let starknet = starknet::API::new(&account);

    let all = ContributionFilter::default(); // TODO filter only non up-to-date PR

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
