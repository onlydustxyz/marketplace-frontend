use crate::database::{models, schema::contributors::dsl, Client, DatabaseError};
use anyhow::anyhow;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use log::error;
use marketplace_domain::*;

impl ContributorProjectionRepository for Client {
	fn insert(
		&self,
		contributor: ContributorProfile,
	) -> Result<(), ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor = models::Contributor::from(contributor);

		diesel::insert_into(dsl::contributors)
			.values(&contributor)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert contributor {contributor:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn find_by_id(
		&self,
		contributor_id: &ContributorId,
	) -> Result<ContributorProfile, ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor: models::Contributor = dsl::contributors
			.find(contributor_id.to_string())
			.get_result(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(contributor.into())
	}

	fn find_by_account(
		&self,
		contributor_account: &ContributorAccount,
	) -> Result<ContributorProfile, ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor: models::Contributor = dsl::contributors
			.filter(dsl::account.eq(contributor_account.to_string()))
			.get_result(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(contributor.into())
	}
}

impl ProjectionRepository<ContributorProfile> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		self.clear_table(dsl::contributors)
			.map_err(|e| ProjectionRepositoryError::Infrastructure(e.into()))
	}
}

impl From<ContributorProfile> for models::Contributor {
	fn from(contributor: ContributorProfile) -> Self {
		Self {
			id: contributor.id.to_string(),
			account: contributor.account.to_string(),
			github_identifier: contributor.github_identifier.to_string(),
			github_username: contributor.github_username,
		}
	}
}

impl From<models::Contributor> for ContributorProfile {
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
