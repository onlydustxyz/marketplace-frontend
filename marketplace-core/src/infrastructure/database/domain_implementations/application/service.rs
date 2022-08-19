use diesel::{BoolExpressionMethods, Connection, ExpressionMethods, QueryDsl, RunQueryDsl};
use mapinto::{ResultMapErrInto, ResultMapInto};

use marketplace_domain::*;

use crate::infrastructure::database::{
	models::{self, Status},
	schema::applications,
	Client, DatabaseError,
};

impl ApplicationService for Client {
	fn accept_application(
		&self,
		id: &ApplicationId,
	) -> Result<Application, ApplicationServiceError> {
		let connection = self
			.connection()
			.map_err(|e| ApplicationServiceError::Infrastructure(Box::new(e)))?;

		let application: Application = applications::dsl::applications
			.find(id.as_uuid())
			.first::<models::Application>(&*connection)
			.map_into()
			.map_err(DatabaseError::from)?;

		if *application.status() != ApplicationStatus::Pending {
			return Err(ApplicationServiceError::InvalidApplicationStatus {
				current: *application.status(),
				required: ApplicationStatus::Pending,
			});
		}

		let res: Result<models::Application, diesel::result::Error> =
			connection.transaction(|| {
				// Set the chosen one to accepted
				let application = diesel::update(
					applications::dsl::applications.filter(applications::id.eq(id.as_uuid())),
				)
				.set(applications::status.eq(Status::Accepted))
				.get_result::<models::Application>(&*connection)?;

				// Set all other applications to refused
				diesel::update(
					applications::dsl::applications.filter(
						applications::contribution_id
							.eq(application.contribution_id)
							.and(applications::id.ne(id.as_uuid())),
					),
				)
				.set(applications::status.eq(Status::Refused))
				.execute(&*connection)?;

				Ok(application)
			});

		res.map_into().map_err(DatabaseError::from).map_err_into()
	}
}

impl From<DatabaseError> for ApplicationServiceError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Diesel(diesel::result::Error::DatabaseError(kind, _)) => match kind {
				diesel::result::DatabaseErrorKind::UniqueViolation => {
					Self::AlreadyExist(Box::new(error))
				},
				diesel::result::DatabaseErrorKind::ForeignKeyViolation => {
					Self::InvalidEntity(Box::new(error))
				},
				_ => Self::Infrastructure(Box::new(error)),
			},
			DatabaseError::Diesel(diesel::result::Error::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
