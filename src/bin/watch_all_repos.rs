use anyhow::Result;
use deathnote_contributions_feeder::database;
use deathnote_contributions_feeder::github;
use deathnote_contributions_feeder::model::*;
use deathnote_contributions_feeder::traits::fetcher::{Fetcher, SyncFetcher};
use deathnote_contributions_feeder::traits::logger::SyncLogger;

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let github = github::API::new();
    let database = database::API::new();

    const ALL: repository::Filter = repository::Filter {
        owner: None,
        name: None,
    };

    for repository in database.fetch_sync(ALL)? {
        let pullrequests = github.fetch(pullrequest::Filter { repository }).await?;
        database.log_sync(&pullrequests)?;
    }

    Ok(())
}
