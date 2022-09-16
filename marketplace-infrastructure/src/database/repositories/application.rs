use std::str::FromStr;

use crate::database::{
	models::{self, Status},
	schema::applications,
	Client, DatabaseError,
};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use itertools::Itertools;
use log::error;
use mapinto::ResultMapErrInto;
use marketplace_domain::*;

impl ApplicationProjectionRepository for Client {
	fn create(
		&self,
		application: ApplicationProjection,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		let connection = self.connection().map_err(ApplicationProjectionRepositoryError::from)?;

		let application = models::Application::from(application);
		diesel::insert_into(applications::table)
			.values(&application)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert a new application {application:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn update(
		&self,
		application: ApplicationProjection,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		let connection = self.connection().map_err(ApplicationProjectionRepositoryError::from)?;
		let application = models::Application::from(application);
		diesel::update(applications::table.filter(applications::id.eq(application.id)))
			.set(&application)
			.execute(&*connection)
			.map_err(|e| {
				error!(
					"Failed to update application with id {} to {application:?}: {e}",
					application.id
				);
				DatabaseError::from(e)
			})?;
		Ok(())
	}

	fn find(
		&self,
		id: &ApplicationId,
	) -> Result<Option<ApplicationProjection>, ApplicationProjectionRepositoryError> {
		let connection = self.connection().map_err(ApplicationProjectionRepositoryError::from)?;

		let res = applications::dsl::applications
			.find(id.as_uuid())
			.first::<models::Application>(&*connection);

		if let Err(diesel::result::Error::NotFound) = res {
			Ok(None)
		} else {
			res.map(|a| Some(a.into()))
				.map_err(|e| {
					error!("Failed while finding application with id {id}: {e}");
					DatabaseError::from(e)
				})
				.map_err_into()
		}
	}

	fn find_by_contribution_and_contributor(
		&self,
		contribution_id: &AggregateId,
		contributor_id: &ContributorId,
	) -> Result<Option<ApplicationProjection>, ApplicationProjectionRepositoryError> {
		let connection = self.connection().map_err(ApplicationProjectionRepositoryError::from)?;

		let res = applications::dsl::applications
			.filter(applications::contribution_id.eq(contribution_id.to_string()))
			.filter(applications::contributor_id.eq(contributor_id.to_string()))
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

		let mut query = applications::dsl::applications
			.filter(applications::contribution_id.eq(contribution_id.to_string()))
			.into_boxed();

		if let Some(contributor_id) = &contributor_id {
			query = query.filter(applications::contributor_id.eq(contributor_id.to_string()))
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

		let mut query = applications::dsl::applications.into_boxed();

		if let Some(contributor_id) = &contributor_id {
			query = query.filter(applications::contributor_id.eq(contributor_id.to_string()))
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
		let connection = self
			.connection()
			.map_err(|e| {
				error!("Failed while trying to get connection from pool: {e}");
				e
			})
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		diesel::delete(applications::dsl::applications)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed while trying to clear applications table: {e}");
				e
			})
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		Ok(())
	}
}

impl From<ApplicationProjection> for models::Application {
	fn from(application: marketplace_domain::ApplicationProjection) -> Self {
		Self {
			id: (*application.id()).into(),
			contribution_id: application.contribution_id().to_string(),
			contributor_id: application.contributor_id().to_string(),
			status: (*application.status()).into(),
			applied_at: *application.applied_at(),
		}
	}
}

impl From<models::Application> for ApplicationProjection {
	fn from(application: models::Application) -> Self {
		let application_projection = Self::new(
			application.id.into(),
			application.contribution_id.parse().unwrap(),
			ContributorId::from_str(application.contributor_id.as_str()).unwrap(),
			application.applied_at,
		);
		match application.status {
			Status::Pending => application_projection.into_pending(),
			Status::Accepted => application_projection.into_accepted(),
			Status::Refused => application_projection.into_refused(),
		}
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
