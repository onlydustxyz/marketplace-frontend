use anyhow::Result;
use dotenv::dotenv;
use futures::stream::StreamExt;

use deathnote_contributions_feeder::{
    database, github,
    model::pullrequest,
    model::repository,
    traits::{fetcher::Fetcher, logger::Logger},
};

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    dotenv().ok();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let database = database::API::default();
    let github = github::API::new();

    let all_repos = repository::Filter::default();

    database
        .fetch(all_repos)
        .await?
        .for_each(|repo| async {
            // TODO: select pr since last indexed time
            let filter = pullrequest::Filter {
                author: None,
                repository: Some(repo.clone()),
            };

            github
                .fetch(filter)
                .await
                .expect("Cannot fetch PR from github")
                .for_each(|pr| async {
                    database.log(pr).await.expect("Cannot log PR in DB");
                })
                .await;

            let status = repository::IndexingStatus::new(repo.id);
            database
                .log(status)
                .await
                .expect("Cannot update indexing status in DB");
        })
        .await;

    Ok(())
}
