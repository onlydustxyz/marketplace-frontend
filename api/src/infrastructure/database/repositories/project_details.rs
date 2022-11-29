use crate::{
	database::{schema::project_details::dsl, Client},
	domain::{ProjectDetailsRepository, ProjectDetailsRepositoryError},
	infrastructure::database::models,
};
use diesel::RunQueryDsl;
use tracing::error;

impl ProjectDetailsRepository for Client {
	fn upsert(
		&self,
		project_details: crate::domain::ProjectDetails,
	) -> Result<(), ProjectDetailsRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ProjectDetailsRepositoryError::Infrastructure(e.into()))?;

		let project_details = models::ProjectDetail::from(project_details);

		diesel::insert_into(dsl::project_details)
			.values(&project_details)
			.on_conflict(dsl::project_id)
			.do_update()
			.set(&project_details)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to upsert project_details {project_details:?}: {e}");
				ProjectDetailsRepositoryError::Infrastructure(e.into())
			})?;

		Ok(())
	}
}
