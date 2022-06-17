use anyhow::{anyhow, Result};
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use log::debug;
use std::env;

use crate::{
    model::{pullrequest, repository},
    traits::{fetcher::SyncFetcher, logger::SyncLogger},
};

use self::schema::{
    projects::{self, dsl::*},
    pull_requests::{self, dsl::*},
};

pub mod models;
pub mod schema;

pub fn establish_connection() -> Result<PgConnection> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).map_err(|e| anyhow!(e))
}

pub struct API {
    connection: PgConnection,
}

impl API {
    pub fn new() -> Self {
        API {
            connection: establish_connection().unwrap(),
        }
    }

    fn insert_pullrequest(&self, pr: models::NewPullRequest) -> Result<()> {
        let _result: models::PullRequest = diesel::insert_into(pull_requests::table)
            .values(&pr)
            .get_result(&self.connection)?;

        Ok(())
    }

    fn insert_project(&self, project: models::NewProject) -> Result<()> {
        let _result: models::Project = diesel::insert_into(projects::table)
            .values(&project)
            .get_result(&self.connection)?;

        Ok(())
    }

    fn update_pullrequest(&self, pr: models::PullRequestForm) -> Result<()> {
        pr.save_changes::<models::PullRequest>(&self.connection)?;
        Ok(())
    }
}

impl From<&pullrequest::PullRequest> for models::NewPullRequest {
    fn from(pr: &pullrequest::PullRequest) -> Self {
        Self {
            id: pr.id.clone(),
            pr_status: pr.status.to_string(),
            pr_smart_contract_status: pullrequest::Status::None.to_string(),
            author: pr.author.clone(),
        }
    }
}

impl From<&pullrequest::PullRequest> for models::PullRequestForm {
    fn from(pr: &pullrequest::PullRequest) -> Self {
        Self {
            // TODO find a way to store refs in db model to avoid clones
            id: pr.id.clone(),
            pr_status: pr.status.to_string(),
            pr_smart_contract_status: pullrequest::Status::None.to_string(),
            author: pr.author.clone(),
        }
    }
}

impl From<models::Project> for repository::Repository {
    fn from(project: models::Project) -> Self {
        Self {
            name: project.repository,
            owner: project.organisation,
        }
    }
}

impl From<&repository::Repository> for models::NewProject {
    fn from(repo: &repository::Repository) -> Self {
        Self {
            repository: repo.name.clone(),
            organisation: repo.owner.clone(),
        }
    }
}

impl SyncLogger<pullrequest::PullRequest, ()> for API {
    fn log_sync(&self, pr: &pullrequest::PullRequest) -> Result<()> {
        debug!("PR #{} was merged by: {}", pr.id, pr.author);

        let result: Result<models::PullRequest> = pull_requests
            .find(&pr.id)
            .first(&self.connection)
            .map_err(anyhow::Error::msg);

        match result {
            Ok(_) => self.update_pullrequest(pr.into()), // PR exists in DB => update
            Err(_) => self.insert_pullrequest(pr.into()), // PR does not exist in DB => insert
        }
    }
}

impl SyncLogger<repository::Repository, ()> for API {
    fn log_sync(&self, repo: &repository::Repository) -> Result<()> {
        let results = projects
            .filter(organisation.eq(&repo.owner))
            .filter(repository.eq(&repo.name))
            .limit(1)
            .load::<models::Project>(&self.connection)?;

        // Create project if not exist
        if results.is_empty() {
            self.insert_project(repo.into())?;
        }

        Ok(())
    }
}

impl SyncFetcher<repository::Filter, repository::Repository> for API {
    fn fetch_sync(&self, _filter: repository::Filter) -> Result<Vec<repository::Repository>> {
        // TODO: implement filtering
        let repositories = projects
            .load::<models::Project>(&self.connection)?
            .into_iter()
            .map(|project| project.into())
            .collect();

        Ok(repositories)
    }
}
