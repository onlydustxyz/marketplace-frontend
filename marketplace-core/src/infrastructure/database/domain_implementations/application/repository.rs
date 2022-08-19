use std::str::FromStr;

use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use itertools::Itertools;
use mapinto::ResultMapErrInto;

use crate::infrastructure::database::{models, schema::applications, Client, DatabaseError};
use onlydust_domain::*;

impl ApplicationRepository for Client {
	fn create(&self, application: Application) -> Result<(), ApplicationRepositoryError> {
		let connection = self.connection().map_err(ApplicationRepositoryError::from)?;

		let application = models::Application::from(application);
		diesel::insert_into(applications::table)
			.values(&application)
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn update(&self, application: Application) -> Result<(), ApplicationRepositoryError> {
		let connection = self.connection().map_err(ApplicationRepositoryError::from)?;
		let application = models::Application::from(application);
		diesel::update(applications::table.filter(applications::id.eq(application.id)))
			.set(application)
			.execute(&*connection)
			.map_err(DatabaseError::from)?;
		Ok(())
	}

	fn find(&self, id: &ApplicationId) -> Result<Option<Application>, ApplicationRepositoryError> {
		let connection = self.connection().map_err(ApplicationRepositoryError::from)?;

		let res = applications::dsl::applications
			.find(id.as_uuid())
			.first::<models::Application>(&*connection);

		if let Err(diesel::result::Error::NotFound) = res {
			Ok(None)
		} else {
			res.map(|a| Some(a.into())).map_err(DatabaseError::from).map_err_into()
		}
	}

	fn list_by_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: Option<ContributorId>,
	) -> Result<Vec<Application>, ApplicationRepositoryError> {
		let connection = self.connection().map_err(ApplicationRepositoryError::from)?;

		let mut query = applications::dsl::applications
			.filter(applications::contribution_id.eq(contribution_id.as_uuid()))
			.into_boxed();

		if let Some(contributor_id) = contributor_id {
			query = query.filter(applications::contributor_id.eq(contributor_id.to_string()))
		}

		let applications =
			query.load::<models::Application>(&*connection).map_err(DatabaseError::from)?;

		Ok(applications.into_iter().map_into().collect())
	}

	fn list_by_contributor(
		&self,
		contributor_id: Option<ContributorId>,
	) -> Result<Vec<Application>, ApplicationRepositoryError> {
		let connection = self.connection().map_err(ApplicationRepositoryError::from)?;

		let mut query = applications::dsl::applications.into_boxed();

		if let Some(contributor_id) = contributor_id {
			query = query.filter(applications::contributor_id.eq(contributor_id.to_string()))
		}

		let applications =
			query.load::<models::Application>(&*connection).map_err(DatabaseError::from)?;

		Ok(applications.into_iter().map_into().collect())
	}
}

impl From<Application> for models::Application {
	fn from(application: onlydust_domain::Application) -> Self {
		Self {
			id: (*application.id()).into(),
			contribution_id: (*application.contribution_id()).into(),
			contributor_id: application.contributor_id().to_string(),
			status: (*application.status()).into(),
		}
	}
}

impl From<models::Application> for Application {
	fn from(application: models::Application) -> Self {
		Self::new(
			application.id.into(),
			application.contribution_id.into(),
			ContributorId::from_str(application.contributor_id.as_str()).unwrap(),
			application.status.into(),
		)
	}
}

impl From<DatabaseError> for ApplicationRepositoryError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Diesel(diesel::result::Error::DatabaseError(kind, _)) => match kind {
				diesel::result::DatabaseErrorKind::UniqueViolation =>
					Self::AlreadyExist(Box::new(error)),
				diesel::result::DatabaseErrorKind::ForeignKeyViolation =>
					Self::InvalidEntity(Box::new(error)),
				_ => Self::Infrastructure(Box::new(error)),
			},
			DatabaseError::Diesel(diesel::result::Error::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
