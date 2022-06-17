use anyhow::Result;
use log::warn;
use std::env;

use deathnote_contributions_feeder::{
    database, github,
    model::*,
    traits::{fetcher::Fetcher, logger::SyncLogger},
};

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let args: Vec<String> = env::args().collect();
    if args.len() != 3 {
        panic!("Invalid arguments.");
    }

    let repository_filter = repository::Filter {
        owner: Some(args[1].clone()),
        name: Some(args[2].clone()),
    };

    let github = github::API::new();
    let database = database::API::new();

    for repository in github.fetch(repository_filter).await? {
        if let Err(error) = database.log_sync(&repository) {
            warn!("Unable to log repository in database: {}", error);
        }

        let pullrequests = github.fetch(pullrequest::Filter { repository }).await?;
        database.log_sync(&pullrequests)?;
    }

    Ok(())
}
