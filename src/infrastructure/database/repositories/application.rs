use crate::diesel::QueryDsl;
use diesel::RunQueryDsl;

use crate::{
	domain::*,
	infrastructure::database::{models, schema::applications, Client},
};

impl ApplicationRepository for Client {
	fn store(&self, application: Application) -> Result<()> {
		let connection =
			self.connection().map_err(|e| Error::ApplicationStoreError(e.to_string()))?;

		let application = models::NewApplication::from(application);
		diesel::insert_into(applications::table)
			.values(&application)
			.execute(&*connection)
			.map_err(|e| Error::ApplicationStoreError(e.to_string()))?;

		Ok(())
	}

	fn find(&self, id: &ApplicationId) -> Result<Application> {
		let connection =
			self.connection().map_err(|e| Error::ApplicationStoreError(e.to_string()))?;

		applications::dsl::applications
			.find(id)
			.first(&*connection)
			.map(|a: models::Application| a.into())
			.map_err(|e| Error::ApplicationStoreError(e.to_string()))
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
