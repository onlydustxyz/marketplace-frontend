use std::str::FromStr;

use crate::database::{
	models::{self},
	schema::pending_applications::dsl,
	Client, DatabaseError,
};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use itertools::Itertools;
use log::error;
use mapinto::ResultMapErrInto;
use marketplace_domain::*;

impl ApplicationProjectionRepository for Client {
	fn insert(
		&self,
		application: ApplicationProjection,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		let connection = self.connection().map_err(ApplicationProjectionRepositoryError::from)?;

		let application = models::Application::from(application);

		diesel::insert_into(dsl::pending_applications)
			.values(&application)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert application {application:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn delete(
		&self,
		contribution_id: &AggregateId,
		contributor_id: &ContributorId,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		let connection = self.connection().map_err(ApplicationProjectionRepositoryError::from)?;

		diesel::delete(
			dsl::pending_applications.find((contribution_id.to_string(), contributor_id.to_string())))
		.execute(&*connection)
		.map_err(|e| {
			error!("Failed to delete pending application of contributor with id {contributor_id} to contribution with id {contribution_id}: {e}");
			DatabaseError::from(e)
		})?;

		Ok(())
	}

	fn find(
		&self,
		contribution_id: &AggregateId,
		contributor_id: &ContributorId,
	) -> Result<Option<ApplicationProjection>, ApplicationProjectionRepositoryError> {
		let connection = self.connection().map_err(ApplicationProjectionRepositoryError::from)?;

		let res = dsl::pending_applications
			.find((contribution_id.to_string(), contributor_id.to_string()))
			.first::<models::Application>(&*connection);

		if let Err(diesel::result::Error::NotFound) = res {
			Ok(None)
		} else {
			res.map(|a| Some(a.into()))
				.map_err(|e| {
					error!("Failed while finding application of contributor with id {contributor_id} to contribution with id {contribution_id}: {e}");
					DatabaseError::from(e)
				})
				.map_err_into()
		}
	}

	fn list_by_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: Option<ContributorId>,
	) -> Result<Vec<ApplicationProjection>, ApplicationProjectionRepositoryError> {
		let connection = self.connection().map_err(ApplicationProjectionRepositoryError::from)?;

		let mut query = dsl::pending_applications
			.filter(dsl::contribution_id.eq(contribution_id.to_string()))
			.into_boxed();

		if let Some(contributor_id) = &contributor_id {
			query = query.filter(dsl::contributor_id.eq(contributor_id.to_string()))
		}

		let applications = query.load::<models::Application>(&*connection).map_err(|e| {
			error!(
				"Failed while listing applications to contribution with id {contribution_id}{}: {e}",
				match contributor_id {
					Some(id) => format!(" by contributor with id {id}"),
					None => "".to_string(),
				}
			);
			DatabaseError::from(e)
		})?;

		Ok(applications.into_iter().map_into().collect())
	}

	fn list_by_contributor(
		&self,
		contributor_id: Option<ContributorId>,
	) -> Result<Vec<ApplicationProjection>, ApplicationProjectionRepositoryError> {
		let connection = self.connection().map_err(ApplicationProjectionRepositoryError::from)?;

		let mut query = dsl::pending_applications.into_boxed();

		if let Some(contributor_id) = &contributor_id {
			query = query.filter(dsl::contributor_id.eq(contributor_id.to_string()))
		}

		let applications = query.load::<models::Application>(&*connection).map_err(|e| {
			error!(
				"Failed while listing applications{}: {e}",
				match contributor_id {
					Some(id) => format!(" of contributor with id {id}"),
					None => "".to_string(),
				}
			);
			DatabaseError::from(e)
		})?;

		Ok(applications.into_iter().map_into().collect())
	}
}

impl ProjectionRepository<ApplicationProjection> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		self.clear_table(dsl::pending_applications)
			.map_err(|e| ProjectionRepositoryError::Infrastructure(e.into()))
	}
}

impl From<ApplicationProjection> for models::Application {
	fn from(application: marketplace_domain::ApplicationProjection) -> Self {
		Self {
			contribution_id: application.contribution_id().to_string(),
			contributor_id: application.contributor_id().to_string(),
			applied_at: *application.applied_at(),
		}
	}
}

impl From<models::Application> for ApplicationProjection {
	fn from(application: models::Application) -> Self {
		Self::new(
			application.contribution_id.parse().unwrap(),
			ContributorId::from_str(application.contributor_id.as_str()).unwrap(),
			application.applied_at,
		)
	}
}

impl From<DatabaseError> for ApplicationProjectionRepositoryError {
	fn from(error: DatabaseError) -> Self {
		use diesel::result::{DatabaseErrorKind, Error as DieselError};

		match error {
			DatabaseError::Transaction(DieselError::DatabaseError(
				DatabaseErrorKind::UniqueViolation,
				_,
			)) => Self::AlreadyExist(Box::new(error)),
			DatabaseError::Transaction(DieselError::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
