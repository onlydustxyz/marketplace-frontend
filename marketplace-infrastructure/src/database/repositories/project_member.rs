use anyhow::anyhow;
use marketplace_domain::*;

use crate::database::{
	models,
	schema::project_members::{self, dsl::*},
	Client, DatabaseError,
};
use diesel::{ExpressionMethods, RunQueryDsl};

impl ProjectMemberProjectionRepository for Client {
	fn store(
		&self,
		member: ProjectMemberProjection,
	) -> Result<(), ProjectMemberProjectionRepositoryError> {
		let connection = self.connection().map_err(ProjectMemberProjectionRepositoryError::from)?;

		let project: models::ProjectMember = member.into();
		diesel::insert_into(project_members::table)
			.values(&project)
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn delete(
		&self,
		project_id_: &ProjectId,
		contributor_id_: &ContributorId,
	) -> Result<(), ProjectMemberProjectionRepositoryError> {
		let connection = self.connection().map_err(ProjectMemberProjectionRepositoryError::from)?;

		diesel::delete(project_members::table)
			.filter(project_id.eq(project_id_.to_string()))
			.filter(contributor_id.eq(contributor_id_.to_string()))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}
}

impl ProjectionRepository<ProjectMemberProjection> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		let connection = self
			.connection()
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		diesel::delete(project_members)
			.execute(&*connection)
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		Ok(())
	}
}

impl From<ProjectMemberProjection> for models::ProjectMember {
	fn from(member: ProjectMemberProjection) -> Self {
		Self {
			project_id: member.project_id().to_string(),
			contributor_id: member.contributor_id().to_string(),
			is_lead_contributor: member.is_lead_contributor(),
		}
	}
}

impl From<DatabaseError> for ProjectMemberProjectionRepositoryError {
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
