use crate::database::{models, schema::contributors, Client, DatabaseError};
use anyhow::anyhow;
use diesel::{query_dsl::filter_dsl::FindDsl, RunQueryDsl};
use log::error;
use marketplace_domain::*;

impl ContributorProjectionRepository for Client {
	fn store(
		&self,
		contributor: ContributorProjection,
	) -> Result<(), ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor: models::Contributor = contributor.into();
		diesel::insert_into(contributors::table)
			.values(&contributor)
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn find_by_id(
		&self,
		contributor_id: &ContributorId,
	) -> Result<ContributorProjection, ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor: models::Contributor = contributors::table
			.find(contributor_id.to_string())
			.get_result(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(contributor.into())
	}
}

impl ProjectionRepository<ContributorProjection> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| {
				error!("Failed while trying to get connection from pool: {e}");
				e
			})
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		diesel::delete(contributors::table)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed while trying to clear contributors table: {e}");
				e
			})
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		Ok(())
	}
}

impl From<ContributorProjection> for models::Contributor {
	fn from(contributor: ContributorProjection) -> Self {
		Self {
			id: contributor.id.to_string(),
			account: contributor.account.to_string(),
			github_identifier: contributor.github_identifier.to_string(),
			github_username: contributor.github_username,
		}
	}
}

impl From<models::Contributor> for ContributorProjection {
	fn from(contributor: models::Contributor) -> Self {
		Self {
			id: contributor.id.parse().unwrap(),
			account: contributor.account.parse().unwrap(),
			github_identifier: contributor.github_identifier.parse().unwrap(),
			github_username: contributor.github_username,
		}
	}
}

impl From<DatabaseError> for ContributorProjectionRepositoryError {
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
