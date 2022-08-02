use crate::diesel::QueryDsl;
use diesel::RunQueryDsl;
use mapinto::ResultMapErrInto;

use crate::{
	domain::*,
	infrastructure::database::{models, schema::applications, Client},
};

impl ApplicationRepository for Client {
	fn store(&self, application: Application) -> Result<(), ApplicationRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ApplicationRepositoryError::Infrastructure(Box::new(e)))?;

		let application = models::NewApplication::from(application);
		diesel::insert_into(applications::table)
			.values(&application)
			.execute(&*connection)
			.map_err(|e| ApplicationRepositoryError::Infrastructure(Box::new(e)))?;

		Ok(())
	}

	fn find(&self, id: &ApplicationId) -> Result<Option<Application>, ApplicationRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ApplicationRepositoryError::Infrastructure(Box::new(e)))?;
		let res = applications::dsl::applications
			.find(id)
			.first::<models::Application>(&*connection);

		if let Err(diesel::result::Error::NotFound) = res {
			Ok(None)
		} else {
			res.map(|a| Some(a.into())).map_err_into()
		}
	}
}

impl From<Application> for models::NewApplication {
	fn from(application: crate::domain::Application) -> Self {
		Self {
			id: *application.id(),
			contribution_id: *application.contribution_id(),
			contributor_id: application.contributor_id().to_string(),
		}
	}
}

impl From<models::Application> for Application {
	fn from(application: models::Application) -> Self {
		Self::new(
			application.id,
			application.contribution_id,
			ContributorId::from(application.contributor_id),
		)
	}
}

impl From<diesel::result::Error> for ApplicationRepositoryError {
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
