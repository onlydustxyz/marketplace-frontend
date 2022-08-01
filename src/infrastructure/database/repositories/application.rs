use crate::diesel::QueryDsl;
use diesel::RunQueryDsl;

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

	fn find(&self, id: &ApplicationId) -> Result<Application, ApplicationRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ApplicationRepositoryError::Infrastructure(Box::new(e)))?;
		applications::dsl::applications
			.find(id)
			.first(&*connection)
			.map(|a: models::Application| a.into())
			.map_err(|e| e.into())
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
			e => Self::Infrastructure(Box::new(e)),
		}
	}
}
