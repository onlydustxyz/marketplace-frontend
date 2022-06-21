use anyhow::Result;
use std::rc::Rc;
use std::sync::Arc;

use deathnote_contributions_feeder::{
    database, github,
    model::pullrequest,
    model::repository,
    traits::{fetcher::Fetcher, logger::Logger},
};

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let database = Rc::new(database::API::new());
    let github = Arc::new(github::API::new());

    let repo_fetcher: Fetcher<repository::Filter, repository::Repository> =
        Fetcher::Sync(database.clone());

    let pr_fetcher: Fetcher<pullrequest::Filter, pullrequest::PullRequest> =
        Fetcher::Async(github.clone());

    let pr_logger: Logger<Vec<pullrequest::PullRequest>, Vec<()>> = Logger::Sync(database.clone());

    let repository_filter = repository::Filter {
        owner: None,
        name: None,
    };

    let status_logger: Logger<repository::IndexingStatus, ()> = Logger::Sync(database.clone());

    for repo in repo_fetcher.fetch(repository_filter).await? {
        let pr_filter = pullrequest::Filter {
            author: None,
            repository: Some(repo.clone()),
        };

        let prs = pr_fetcher.fetch(pr_filter).await?;
        pr_logger.log(&prs).await?;

        let status = repository::IndexingStatus::new(repo.id);
        status_logger.log(&status).await?;
    }

    Ok(())
}
