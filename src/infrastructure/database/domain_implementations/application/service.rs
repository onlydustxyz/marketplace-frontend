use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use mapinto::{ResultMapErrInto, ResultMapInto};

use crate::{
	domain::*,
	infrastructure::database::{
		models::{self, Status},
		schema::applications,
		Client,
	},
};

impl ApplicationService for Client {
	fn accept_application(
		&self,
		id: &ApplicationId,
	) -> Result<Application, ApplicationServiceError> {
		let connection = self
			.connection()
			.map_err(|e| ApplicationServiceError::Infrastructure(Box::new(e)))?;

		let res: Result<Application, diesel::result::Error> =
			connection.build_transaction().run(|| {
				// Set the chosen one to accepted
				let application: Application = diesel::update(
					applications::dsl::applications.filter(applications::id.eq(id.as_uuid())),
				)
				.set(applications::status.eq(Status::Accepted))
				.get_result::<models::Application>(&*connection)
				.map_into()?;

				// Set all other pending applications to refused
				diesel::update(
					applications::dsl::applications
						.filter(applications::status.eq(Status::Pending)),
				)
				.set(applications::status.eq(Status::Refused))
				.execute(&*connection)?;

				Ok(application)
			});

		res.map_err_into()
	}
}

impl From<diesel::result::Error> for ApplicationServiceError {
	fn from(error: diesel::result::Error) -> Self {
		match error {
			diesel::result::Error::DatabaseError(kind, _) => match kind {
				diesel::result::DatabaseErrorKind::UniqueViolation =>
					Self::AlreadyExist(Box::new(error)),
				diesel::result::DatabaseErrorKind::ForeignKeyViolation =>
					Self::InvalidEntity(Box::new(error)),
				_ => Self::Infrastructure(Box::new(error)),
			},
			diesel::result::Error::NotFound => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
