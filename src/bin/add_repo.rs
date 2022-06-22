use anyhow::Result;
use std::env;

use deathnote_contributions_feeder::{
    database, github,
    model::repository,
    services::contributions::fetch_and_log,
    traits::{fetcher::Fetcher, logger::Logger},
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

    let database = database::API::new();
    let github = github::API::new();

    fetch_and_log(
        Fetcher::new_async(&github),
        Logger::new_sync(&database),
        repository_filter,
    )
    .await?;

    Ok(())
}
