pub mod connections;
pub mod models;
pub mod schema;

use anyhow::Result;
use async_trait::async_trait;
use diesel::prelude::*;
use log::info;
use std::sync::{Mutex, MutexGuard};

use crate::{
    domain::{self, FetchResult, Fetcher, Logger},
    utils::stream::Streamable,
};
use connections::pg_connection::{self, DbConn};

use self::schema::{
    contributions::{self, dsl::*},
    projects::{self, dsl::*},
};
use models as db_model;

pub fn establish_connection() -> Result<DbConn> {
    pg_connection::init_pool()
        .get()
        .map(DbConn)
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

    fn insert_contribution(&self, contribution: db_model::NewContribution) -> Result<()> {
        diesel::insert_into(contributions::table)
            .values(&contribution)
            .get_result::<db_model::Contribution>(&**self.connection())?;

        Ok(())
    }

    fn insert_project(&self, project: db_model::NewProject) -> Result<()> {
        diesel::insert_into(projects::table)
            .values(&project)
            .get_result::<db_model::Project>(&**self.connection())?;

        Ok(())
    }

    fn update_contribution(&self, contribution: db_model::ContributionForm) -> Result<()> {
        contribution.save_changes::<db_model::Contribution>(&**self.connection())?;
        Ok(())
    }

    fn find_projects(
        &self,
        filter: domain::ProjectFilter,
    ) -> impl Iterator<Item = db_model::Project> {
        let mut query = projects.into_boxed();

        if let Some(owner_) = filter.owner {
            query = query.filter(owner.eq(owner_));
        };

        if let Some(name_) = filter.name {
            query = query.filter(name.eq(name_));
        };

        let results = query
            .load::<db_model::Project>(&**self.connection())
            .expect("Error while fetching projects from database");

        results.into_iter()
    }

    fn find_contributions(
        &self,
        filter: domain::ContributionFilter,
    ) -> Box<dyn Iterator<Item = db_model::Contribution> + Send> {
        let mut query = contributions.into_boxed();

        if let Some(repo) = filter.project {
            let project = self
                .find_projects(domain::ProjectFilter {
                    owner: Some(repo.owner),
                    name: Some(repo.name),
                })
                .take(1)
                .collect::<Vec<db_model::Project>>()
                .pop();

            match project {
                Some(project) => query = query.filter(project_id.eq(project.id)),
                None => return Box::new(std::iter::empty::<db_model::Contribution>()),
            }
        };

        let results = query
            .load::<db_model::Contribution>(&**self.connection())
            .expect("Error while fetching contributions from database");

        Box::new(results.into_iter())
    }
}

impl Default for API {
    fn default() -> Self {
        Self::new(establish_connection().expect("Unable to get a connection from the pool"))
    }
}

#[async_trait]
impl Logger<domain::Contribution, ()> for API {
    async fn log(&self, contribution: domain::Contribution) -> Result<()> {
        info!(
            "Logging PR #{} by {} ({})",
            contribution.id, contribution.author, contribution.status
        );

        let result: Result<db_model::Contribution> = contributions
            .find(&contribution.id)
            .first(&**self.connection())
            .map_err(anyhow::Error::msg);

        match result {
            Ok(_) => self.update_contribution(contribution.into()), // PR exists in DB => update
            Err(_) => self.insert_contribution(contribution.into()), // PR does not exist in DB => insert
        }
    }
}

#[async_trait]
impl Logger<domain::Project, ()> for API {
    async fn log(&self, repo: domain::Project) -> Result<()> {
        info!("Logging repository {}/{}", repo.owner, repo.name);

        let filter = domain::ProjectFilter {
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
impl Logger<domain::ContractUpdateStatus, ()> for API {
    async fn log(&self, contract_status: domain::ContractUpdateStatus) -> Result<()> {
        info!(
            "Logging successful contract update for PR#{}",
            contract_status.contribution_id
        );

        db_model::ContributionContractUpdateForm::from(contract_status)
            .save_changes::<db_model::Contribution>(&**self.connection())?;
        Ok(())
    }
}

#[async_trait]
impl Fetcher<domain::ProjectFilter, domain::Project> for API {
    async fn fetch(&self, filter: domain::ProjectFilter) -> FetchResult<'_, domain::Project> {
        info!("Fetching repositories with filter: {:?}", filter);

        let results = self.find_projects(filter).map(|project| project.into());
        Ok(Streamable::Sync(results.into()))
    }
}

#[async_trait]
impl Logger<domain::IndexingStatus, ()> for API {
    async fn log(&self, indexing_status: domain::IndexingStatus) -> Result<()> {
        info!(
            "Logging successful syncing for project {} ",
            indexing_status.project_id
        );

        db_model::ProjectIndexingStatusUpdateForm::from(indexing_status)
            .save_changes::<db_model::Project>(&**self.connection())?;

        Ok(())
    }
}

#[async_trait]
impl Fetcher<domain::ContributionFilter, domain::Contribution> for API {
    async fn fetch(&self, filter: domain::ContributionFilter) -> FetchResult<domain::Contribution> {
        info!("Fetching pull requests with filter {:?} ", filter);

        let contributions_ = self
            .find_contributions(filter)
            .map(|contribution| contribution.into());

        Ok(Streamable::Sync(contributions_.into()))
    }
}
