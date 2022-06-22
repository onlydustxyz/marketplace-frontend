use anyhow::Result;
use std::env;

use futures::stream::StreamExt;

use deathnote_contributions_feeder::{
    database, github,
    model::repository,
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

    let database = database::API::default();
    let github = github::API::new();

    github
        .fetch(repository_filter)
        .await?
        .for_each(|repo| async {
            database
                .log(repo)
                .await
                .expect("Unable to log repository in database");
        })
        .await;

    Ok(())
}
