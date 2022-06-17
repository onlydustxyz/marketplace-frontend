use anyhow::Result;
use std::rc::Rc;
use std::sync::Arc;

use deathnote_contributions_feeder::{
    database, github,
    services::contributions::RepositoryAnalyzer,
    traits::{fetcher::Fetcher, logger::Logger},
};

#[tokio::main]
async fn main() -> Result<()> {
    // TODO: parallelize the tasks
    env_logger::init();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let database = Rc::new(database::API::new());
    let github = Arc::new(github::API::new());

    let analyzer = RepositoryAnalyzer::new(
        Fetcher::Sync(database.clone()),
        None,
        Fetcher::Async(github.clone()),
        Logger::Sync(database.clone()),
    );

    analyzer.analyze_all().await
}
