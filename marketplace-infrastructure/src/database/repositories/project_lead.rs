use anyhow::anyhow;
use diesel::prelude::*;
use itertools::Itertools;
use log::error;
use marketplace_domain::{
	ProjectId, ProjectLead, ProjectLeadRepository, ProjectLeadRepositoryError,
	ProjectionRepository, ProjectionRepositoryError,
};
use uuid::Uuid;

use crate::database::{models, schema::project_leads::dsl, Client, DatabaseError};

impl ProjectionRepository<ProjectLead> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		self.clear_table(dsl::project_leads)
			.map_err(|e| ProjectionRepositoryError::Infrastructure(e.into()))
	}
}

impl ProjectLeadRepository for Client {
	fn upsert(&self, lead_contributor: ProjectLead) -> Result<(), ProjectLeadRepositoryError> {
		let connection = self.connection().map_err(ProjectLeadRepositoryError::from)?;

		let lead_contributor = models::ProjectLead::from(lead_contributor);

		diesel::insert_into(dsl::project_leads)
			.values(&lead_contributor)
			.on_conflict((dsl::project_id, dsl::user_id))
			.do_nothing()
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert lead contributor {lead_contributor:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn delete(
		&self,
		project_id: &ProjectId,
		user_id: Uuid,
	) -> Result<(), ProjectLeadRepositoryError> {
		let connection = self.connection().map_err(ProjectLeadRepositoryError::from)?;

		diesel::delete(dsl::project_leads)
			.filter(dsl::project_id.eq(project_id.as_ref()))
			.filter(dsl::user_id.eq(user_id))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn list_by_project(
		&self,
		project_id: &marketplace_domain::ProjectId,
	) -> Result<Vec<ProjectLead>, ProjectLeadRepositoryError> {
		let connection = self.connection().map_err(ProjectLeadRepositoryError::from)?;

		let project_leads = dsl::project_leads
			.filter(dsl::project_id.eq(project_id.as_ref()))
			.load::<models::ProjectLead>(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(project_leads.into_iter().map_into().collect())
	}
}

impl From<models::ProjectLead> for ProjectLead {
	fn from(lead_contributor: models::ProjectLead) -> Self {
		ProjectLead::new(lead_contributor.project_id.into(), lead_contributor.user_id)
	}
}

impl From<ProjectLead> for models::ProjectLead {
	fn from(lead_contributor: ProjectLead) -> Self {
		Self {
			project_id: (*lead_contributor.project_id()).into(),
			user_id: *lead_contributor.user_id(),
		}
	}
}

impl From<DatabaseError> for ProjectLeadRepositoryError {
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
