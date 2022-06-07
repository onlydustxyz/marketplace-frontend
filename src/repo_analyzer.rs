use crate::db::{
    self,
    models::*,
    schema::projects::{self, dsl::*},
};
use crate::model::github::RepositoryWithExtension;
use anyhow::{anyhow, Result};
use diesel::prelude::*;
use log::debug;

const GITHUB_API_ROOT: &str = "https://api.github.com";

pub async fn analyze(organisation_name: &str, repository_name: &str) -> Result<()> {
    debug!(
        "Entering analyze with args: {} - {}",
        organisation_name, repository_name
    );
    let connection = db::establish_connection()?;

    let octo = octocrab::instance();
    let repo = octo
        .get::<RepositoryWithExtension, String, ()>(
            format!(
                "{}/repos/{}/{}",
                GITHUB_API_ROOT, organisation_name, repository_name
            ),
            None::<&()>,
        )
        .await?;
    println!("open_issues: {:?}", repo.open_issues);
    let results = projects
        .filter(organisation.eq(organisation_name))
        .filter(repository.eq(repository_name))
        .limit(1)
        .load::<Project>(&connection)
        .expect("Error loading projects");

    if results.is_empty() {
        create_project(&connection, organisation_name, repository_name)?;
    }
    let page = octo
        .pulls(organisation_name, repository_name)
        .list()
        .state(octocrab::params::State::Open)
        .direction(octocrab::params::Direction::Ascending)
        .per_page(100)
        .page(0u32)
        .send()
        .await?;
    println!("{:?}", page);
    Ok(())
}

fn create_project(
    conn: &PgConnection,
    organisation_name: &str,
    repository_name: &str,
) -> Result<Project> {
    let new_project = NewProject {
        organisation: String::from(organisation_name),
        repository: String::from(repository_name),
    };
    diesel::insert_into(projects::table)
        .values(&new_project)
        .get_result(conn)
        .map_err(|e| anyhow!(e))
}
