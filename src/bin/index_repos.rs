use anyhow::Result;

use deathnote_contributions_feeder::{
    database, github,
    model::pullrequest,
    model::repository,
    services::contributions::fetch_and_log,
    traits::{fetcher::Fetcher, logger::Logger},
};

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let database = database::API::new();
    let github = github::API::new();

    let repo_fetcher: Fetcher<repository::Filter, repository::Repository> =
        Fetcher::new_sync(&database);

    let repository_filter = repository::Filter {
        owner: None,
        name: None,
    };

    let status_logger = Logger::new_sync(&database);

    for repo in repo_fetcher.fetch(repository_filter).await? {
        let pr_filter = pullrequest::Filter {
            author: None,
            repository: Some(repo.clone()),
        };

        // Fetch and log PR
        let results = fetch_and_log(
            Fetcher::new_async(&github),
            Logger::new_sync(&database),
            pr_filter,
        )
        .await?;

        let ok = results.into_iter().filter(|res| res.is_ok()).count() > 0;

        if ok {
            let status = repository::IndexingStatus::new(repo.id);
            status_logger.log(status).await?;
        }
    }

    Ok(())
}
