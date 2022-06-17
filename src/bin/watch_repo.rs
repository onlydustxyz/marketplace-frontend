use anyhow::Result;
use std::env;
use std::rc::Rc;
use std::sync::Arc;

use deathnote_contributions_feeder::{
    database, github,
    model::repository,
    services::contributions::RepositoryAnalyzer,
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

    let database = Rc::new(database::API::new());
    let github = Arc::new(github::API::new());

    let analyzer = RepositoryAnalyzer::new(
        Fetcher::Async(github.clone()),
        Some(Logger::Sync(database.clone())),
        Fetcher::Async(github.clone()),
        Logger::Sync(database.clone()),
    );

    analyzer.analyze(repository_filter).await
}
