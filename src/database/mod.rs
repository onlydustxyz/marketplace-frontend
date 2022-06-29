use anyhow::Result;
use async_trait::async_trait;
use diesel::prelude::*;
use log::info;
use std::sync::{Mutex, MutexGuard};

use crate::{
    connection::{self, DbConn},
    model::{pullrequest, repository},
    starknet::models::ContractUpdateStatus,
    traits::{fetcher::*, logger::*, Streamable},
};

use self::{
    models::{
        Project, ProjectIndexingStatusUpdateForm, PullRequest, PullRequestContractUpdateForm,
    },
    schema::{
        projects::{self, dsl::*},
        pull_requests::{self, dsl::*},
    },
};

pub mod models;
pub mod schema;

pub fn establish_connection() -> Result<DbConn> {
    connection::init_pool()
        .get()
        .map(|connection| DbConn(connection))
        .map_err(anyhow::Error::msg)
}

pub struct API {
    connection: Mutex<DbConn>,
}

impl API {
    pub fn new(connection: DbConn) -> Self {
        API {
            connection: Mutex::new(connection),
        }
    }

    fn connection(&self) -> MutexGuard<'_, DbConn> {
        self.connection.lock().unwrap()
    }

    fn insert_pullrequest(&self, pr: models::NewPullRequest) -> Result<()> {
        diesel::insert_into(pull_requests::table)
            .values(&pr)
            .get_result::<models::PullRequest>(&**self.connection())?;

        Ok(())
    }

    fn insert_project(&self, project: models::NewProject) -> Result<()> {
        diesel::insert_into(projects::table)
            .values(&project)
            .get_result::<models::Project>(&**self.connection())?;

        Ok(())
    }

    fn update_pullrequest(&self, pr: models::PullRequestForm) -> Result<()> {
        pr.save_changes::<models::PullRequest>(&**self.connection())?;
        Ok(())
    }

    fn find_projects(&self, filter: repository::Filter) -> impl Iterator<Item = Project> {
        let mut query = projects.into_boxed();

        if let Some(owner) = filter.owner {
            query = query.filter(organisation.eq(owner));
        };

        if let Some(name) = filter.name {
            query = query.filter(repository.eq(name));
        };

        let results = query
            .load::<models::Project>(&**self.connection())
            .expect("Error while fetching projects from database");

        results.into_iter()
    }

    fn find_pullrequests(
        &self,
        filter: pullrequest::Filter,
    ) -> Box<dyn Iterator<Item = PullRequest> + Send> {
        let mut query = pull_requests.into_boxed();

        if let Some(repo) = filter.repository {
            let project = self
                .find_projects(repository::Filter {
                    owner: Some(repo.owner),
                    name: Some(repo.name),
                })
                .take(1)
                .collect::<Vec<Project>>()
                .pop();

            match project {
                Some(project) => query = query.filter(project_id.eq(project.id)),
                None => return Box::new(std::iter::empty::<PullRequest>()),
            }
        };

        let results = query
            .load::<models::PullRequest>(&**self.connection())
            .expect("Error while fetching pullrequests from database");

        Box::new(results.into_iter())
    }
}

impl Default for API {
    fn default() -> Self {
        Self::new(establish_connection().expect("Unable to get a connection from the pool"))
    }
}

#[async_trait]
impl Logger<pullrequest::PullRequest, Result<()>> for API {
    async fn log(&self, pr: pullrequest::PullRequest) -> Result<()> {
        info!("Logging PR #{} by {} ({})", pr.id, pr.author, pr.status);

        let result: Result<models::PullRequest> = pull_requests
            .find(&pr.id)
            .first(&**self.connection())
            .map_err(anyhow::Error::msg);

        match result {
            Ok(_) => self.update_pullrequest(pr.into()), // PR exists in DB => update
            Err(_) => self.insert_pullrequest(pr.into()), // PR does not exist in DB => insert
        }
    }
}

#[async_trait]
impl Logger<repository::Repository, Result<()>> for API {
    async fn log(&self, repo: repository::Repository) -> Result<()> {
        info!("Logging repository {}/{}", repo.owner, repo.name);

        let filter = repository::Filter {
            owner: Some(repo.owner.clone()),
            name: Some(repo.name.clone()),
        };

        if self.find_projects(filter).count() == 0 {
            self.insert_project(repo.into())?;
        }

        Ok(())
    }
}

#[async_trait]
impl Logger<ContractUpdateStatus, Result<()>> for API {
    async fn log(&self, status: ContractUpdateStatus) -> Result<()> {
        info!("Logging successful contract update for PR#{}", status.pr_id);

        PullRequestContractUpdateForm::from(status)
            .save_changes::<models::PullRequest>(&**self.connection())?;
        Ok(())
    }
}

#[async_trait]
impl Fetcher<repository::Filter, repository::Repository> for API {
    async fn fetch(&self, filter: repository::Filter) -> FetchResult<'_, repository::Repository> {
        info!("Fetching repositories with filter: {:?}", filter);

        let results = self.find_projects(filter).map(|project| project.into());
        Ok(Streamable::Sync(results.into()))
    }
}

#[async_trait]
impl Logger<repository::IndexingStatus, Result<()>> for API {
    async fn log(&self, status: repository::IndexingStatus) -> Result<()> {
        info!(
            "Logging successful syncing for project {} ",
            status.repository_id
        );

        ProjectIndexingStatusUpdateForm::from(status)
            .save_changes::<models::Project>(&**self.connection())?;

        Ok(())
    }
}

#[async_trait]
impl Fetcher<pullrequest::Filter, pullrequest::PullRequest> for API {
    async fn fetch(&self, filter: pullrequest::Filter) -> FetchResult<pullrequest::PullRequest> {
        info!("Fetching pull requests with filter {:?} ", filter);

        let pullrequests = self.find_pullrequests(filter).map(|pr| pr.into());

        Ok(Streamable::Sync(pullrequests.into()))
    }
}
