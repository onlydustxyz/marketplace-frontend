use anyhow::Result;
use dotenv::dotenv;
use futures::stream::StreamExt;

use deathnote_contributions_feeder::{database, domain::*, github};

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    dotenv().ok();
    octocrab::initialise(octocrab::Octocrab::builder())?;

    let database = database::API::default();
    let github = github::API::new();

    let all_repos = ProjectFilter::default();

    database
        .fetch(all_repos)
        .await?
        .for_each(|repo| async {
            // TODO: select contributions since last indexed time
            let filter = ContributionFilter {
                author: None,
                project: Some(repo.clone()),
            };

            github
                .fetch(filter)
                .await
                .expect("Cannot fetch PR from github")
                .for_each(|contribution| async {
                    database
                        .log(contribution)
                        .await
                        .expect("Cannot log PR in DB");
                })
                .await;

            let status = IndexingStatus::new(repo.id);
            database
                .log(status)
                .await
                .expect("Cannot update indexing status in DB");
        })
        .await;

    Ok(())
}
