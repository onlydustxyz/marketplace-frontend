pub mod connections;
pub mod schema;

use crate::domain::{self, Action};
use anyhow::Result;
use connections::pg_connection::{self, DbConn};
use diesel::prelude::*;
use itertools::Itertools;
use std::{
    env,
    sync::{Mutex, MutexGuard},
};

use self::schema::{
    contributions::{self},
    projects::dsl::*,
};
use crate::infrastructure::db_model;

pub fn establish_connection() -> Result<DbConn> {
    pg_connection::init_pool()
        .get()
        .map(DbConn)
        .map_err(anyhow::Error::msg)
}

fn establish_migration_connection() -> PgConnection {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn run_db_migrations() {
    let connection = establish_migration_connection();
    diesel_migrations::run_pending_migrations(&connection).expect("diesel migration failure");
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

    fn new_contribution(
        &self,
        contribution_: domain::Contribution,
        hash_: Option<String>,
    ) -> Result<()> {
        let mut new_contribution = db_model::NewContribution::from(contribution_);
        new_contribution.transaction_hash = hash_;
        diesel::insert_into(contributions::table)
            .values(&new_contribution)
            .get_result::<db_model::Contribution>(&**self.connection())?;

        Ok(())
    }

    fn assign_contribution(
        &self,
        id_: domain::ContributionId,
        contributor_id_: domain::ContributorId,
        hash_: Option<String>,
    ) -> Result<()> {
        db_model::AssignContributionForm {
            id: id_,
            status: domain::ContributionStatus::Assigned.to_string(),
            contributor_id: contributor_id_.to_string(),
            transaction_hash: hash_,
        }
        .save_changes::<db_model::Contribution>(&**self.connection())?;
        Ok(())
    }

    fn unassign_contribution(
        &self,
        id_: domain::ContributionId,
        hash_: Option<String>,
    ) -> Result<()> {
        db_model::AssignContributionForm {
            id: id_,
            status: domain::ContributionStatus::Open.to_string(),
            contributor_id: String::new(),
            transaction_hash: hash_,
        }
        .save_changes::<db_model::Contribution>(&**self.connection())?;
        Ok(())
    }

    fn validate_contribution(
        &self,
        id_: domain::ContributionId,
        hash_: Option<String>,
    ) -> Result<()> {
        db_model::ValidateContributionForm {
            id: id_,
            status: domain::ContributionStatus::Completed.to_string(),
            transaction_hash: hash_,
        }
        .save_changes::<db_model::Contribution>(&**self.connection())?;
        Ok(())
    }

    pub fn find_projects_by_owner_and_name(
        &self,
        project_owner: &str,
        project_name: &str,
    ) -> impl Iterator<Item = domain::Project> {
        let results = projects
            .filter(owner.eq(project_owner))
            .filter(name.eq(project_name))
            .load::<db_model::Project>(&**self.connection())
            .expect("Error while fetching projects from database");

        results.into_iter().map_into()
    }

    pub fn find_projects(
        &self,
        filter: &domain::ProjectFilter,
    ) -> impl Iterator<Item = domain::Project> {
        let mut query = projects.into_boxed();

        if let Some(owner_) = &filter.owner {
            query = query.filter(owner.eq(owner_));
        };

        if let Some(name_) = &filter.name {
            query = query.filter(name.eq(name_));
        };

        let results = query
            .load::<db_model::Project>(&**self.connection())
            .expect("Error while fetching projects from database");

        results.into_iter().map_into()
    }

    pub fn execute_actions(&self, actions: &[Action], hash: &str) -> Result<()> {
        for action in actions {
            match action {
                Action::CreateContribution {
                    contribution: contribution_,
                } => self.new_contribution(*contribution_.clone(), Some(hash.into())),

                Action::AssignContributor {
                    contribution_id: id_,
                    contributor_id: contributor_id_,
                } => self.assign_contribution(id_.clone(), *contributor_id_, Some(hash.into())),

                Action::UnassignContributor {
                    contribution_id: id_,
                } => self.unassign_contribution(id_.clone(), Some(hash.into())),

                Action::ValidateContribution {
                    contribution_id: id_,
                } => self.validate_contribution(id_.clone(), Some(hash.into())),
            }?;
        }

        Ok(())
    }
}

impl Default for API {
    fn default() -> Self {
        Self::new(establish_connection().expect("Unable to get a connection from the pool"))
    }
}
