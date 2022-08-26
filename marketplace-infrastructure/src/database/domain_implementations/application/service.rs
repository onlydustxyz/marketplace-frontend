use diesel::{BoolExpressionMethods, Connection, ExpressionMethods, QueryDsl, RunQueryDsl};
use mapinto::ResultMapErrInto;

use marketplace_domain::*;

use crate::database::{
	models::{self, Status},
	schema::applications,
	Client, DatabaseError,
};

impl ApplicationService for Client {
	fn accept_application(&self, application: Application) -> Result<(), ApplicationServiceError> {
		let connection = self
			.connection()
			.map_err(|e| ApplicationServiceError::Infrastructure(Box::new(e)))?;

		if *application.status() != ApplicationStatus::Pending {
			return Err(ApplicationServiceError::InvalidApplicationStatus {
				current: *application.status(),
				required: ApplicationStatus::Pending,
			});
		}

		let res: Result<(), diesel::result::Error> = connection.transaction(|| {
			let application = diesel::update(
				applications::dsl::applications
					.filter(applications::id.eq(application.id().as_uuid())),
			)
			.set(applications::status.eq(Status::Accepted))
			.get_result::<models::Application>(&*connection)?;

			diesel::update(
				applications::dsl::applications.filter(
					applications::contribution_id
						.eq(application.contribution_id)
						.and(applications::id.ne(application.id)),
				),
			)
			.set(applications::status.eq(Status::Refused))
			.execute(&*connection)?;

			Ok(())
		});

		res.map_err(DatabaseError::from).map_err_into()
	}

	fn reject_all_applications(
		&self,
		contribution_id: &ContributionId,
	) -> Result<(), ApplicationServiceError> {
		let connection = self
			.connection()
			.map_err(|e| ApplicationServiceError::Infrastructure(Box::new(e)))?;

		let res: Result<(), diesel::result::Error> = connection.transaction(|| {
			diesel::update(
				applications::dsl::applications
					.filter(applications::contribution_id.eq(contribution_id.as_uuid())),
			)
			.set(applications::status.eq(Status::Refused))
			.execute(&*connection)?;

			Ok(())
		});

		res.map_err(DatabaseError::from).map_err_into()
	}
}

impl From<DatabaseError> for ApplicationServiceError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Transaction(diesel::result::Error::DatabaseError(kind, _)) => match kind
			{
				diesel::result::DatabaseErrorKind::UniqueViolation => {
					Self::AlreadyExist(Box::new(error))
				},
				diesel::result::DatabaseErrorKind::ForeignKeyViolation => {
					Self::InvalidEntity(Box::new(error))
				},
				_ => Self::Infrastructure(Box::new(error)),
			},
			DatabaseError::Transaction(diesel::result::Error::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
