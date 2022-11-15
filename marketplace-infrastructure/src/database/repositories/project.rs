use anyhow::anyhow;
use diesel::{QueryDsl, RunQueryDsl};
use log::error;
use marketplace_domain::{Project, ProjectId, ProjectRepository, ProjectRepositoryError};

use crate::database::{models, schema::projects::dsl, Client, DatabaseError};

impl ProjectRepository for Client {
	fn insert(&self, project: Project) -> Result<(), ProjectRepositoryError> {
		let connection = self.connection().map_err(ProjectRepositoryError::from)?;

		let project: models::Project = project.into();

		diesel::insert_into(dsl::projects)
			.values(&project)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert lead contributor {project:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn find(&self, id: ProjectId) -> Result<Project, ProjectRepositoryError> {
		let connection = self.connection().map_err(ProjectRepositoryError::from)?;

		let project = dsl::projects
			.find(id.as_ref())
			.first::<models::Project>(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(project.into())
	}
}

impl From<DatabaseError> for ProjectRepositoryError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Transaction(diesel::result::Error::DatabaseError(kind, _)) => match kind
			{
				diesel::result::DatabaseErrorKind::UniqueViolation =>
					Self::AlreadyExist(anyhow!(error)),
				_ => Self::Infrastructure(anyhow!(error)),
			},
			DatabaseError::Transaction(diesel::result::Error::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(anyhow!(error)),
		}
	}
}

impl From<models::Project> for Project {
	fn from(project: models::Project) -> Self {
		Project::new(project.id.into(), project.name)
	}
}

impl From<Project> for models::Project {
	fn from(project: Project) -> Self {
		let (id, name) = project.dissolve();
		Self {
			id: id.into(),
			name,
		}
	}
}
