use crate::database::{models, schema::project_members::dsl, Client, DatabaseError};
use anyhow::anyhow;
use diesel::prelude::*;
use itertools::Itertools;
use log::error;
use marketplace_domain::*;
use std::str::FromStr;

impl ProjectMemberProjectionRepository for Client {
	fn store(
		&self,
		member: ProjectMemberProjection,
	) -> Result<(), ProjectMemberProjectionRepositoryError> {
		let member: models::ProjectMember = member.into();
		self.insert(dsl::project_members, &member).map_err(|e| {
			error!("Failed to insert project member {member:?}: {e}");
			ProjectMemberProjectionRepositoryError::from(e)
		})
	}

	fn delete(
		&self,
		project_id_: &ProjectId,
		contributor_account_: &ContributorAccount,
	) -> Result<(), ProjectMemberProjectionRepositoryError> {
		let connection = self.connection().map_err(ProjectMemberProjectionRepositoryError::from)?;

		diesel::delete(dsl::project_members)
			.filter(dsl::project_id.eq(project_id_.to_string()))
			.filter(dsl::contributor_account.eq(contributor_account_.to_string()))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn list_by_project(
		&self,
		project_id_: &ProjectId,
	) -> Result<Vec<ProjectMemberProjection>, ProjectMemberProjectionRepositoryError> {
		let connection = self.connection().map_err(ProjectMemberProjectionRepositoryError::from)?;

		let project_members_ = dsl::project_members
			.filter(dsl::project_id.eq(project_id_.to_string()))
			.load::<models::ProjectMember>(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(project_members_.into_iter().map_into().collect())
	}
}

impl ProjectionRepository<ProjectMemberProjection> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		self.clear_table(dsl::project_members)
			.map_err(|e| ProjectionRepositoryError::Infrastructure(e.into()))
	}
}

impl From<ProjectMemberProjection> for models::ProjectMember {
	fn from(member: ProjectMemberProjection) -> Self {
		Self {
			project_id: member.project_id().to_string(),
			contributor_account: member.contributor_account().to_string(),
		}
	}
}

impl From<models::ProjectMember> for ProjectMemberProjection {
	fn from(member: models::ProjectMember) -> Self {
		ProjectMemberProjection::new(
			member.project_id.parse().unwrap(),
			ContributorAccount::from_str(member.contributor_account.as_str()).unwrap(),
		)
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
