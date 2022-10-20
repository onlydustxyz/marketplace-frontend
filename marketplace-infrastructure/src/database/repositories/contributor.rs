use crate::database::{models, schema::contributors::dsl, Client, DatabaseError};
use anyhow::anyhow;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use log::error;
use marketplace_domain::*;

impl ContributorProjectionRepository for Client {
	fn upsert_github_user_data(
		&self,
		contributor: ContributorProfile,
	) -> Result<(), ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor = models::NewGithubContributor::from(contributor);

		diesel::insert_into(dsl::contributors)
			.values(&contributor)
			.on_conflict(dsl::account)
			.do_update()
			.set(&contributor)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert contributor {contributor:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn upsert_discord_handle(
		&self,
		contributor: ContributorProfile,
	) -> Result<(), ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor = models::NewDiscordContributor::from(contributor);

		diesel::insert_into(dsl::contributors)
			.values(&contributor)
			.on_conflict(dsl::account)
			.do_update()
			.set(&contributor)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert contributor {contributor:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn find_by_account_address(
		&self,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<ContributorProfile, ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor: models::Contributor = dsl::contributors
			.filter(dsl::account.eq(contributor_account_address.to_string()))
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

impl From<ContributorProfile> for models::NewGithubContributor {
	fn from(contributor: ContributorProfile) -> Self {
		Self {
			account: contributor.account.to_string(),
			// safe to unwrap as only called when data is present
			github_identifier: contributor.github_identifier.unwrap().to_string(),
			github_username: contributor.github_username.unwrap(),
		}
	}
}

impl From<ContributorProfile> for models::NewDiscordContributor {
	fn from(contributor: ContributorProfile) -> Self {
		Self {
			account: contributor.account.to_string(),
			// safe to unwrap as only called when data is present
			discord_handle: contributor.discord_handle.unwrap(),
		}
	}
}

impl From<models::Contributor> for ContributorProfile {
	fn from(contributor: models::Contributor) -> Self {
		Self {
			account: contributor.account.parse().unwrap(),
			github_identifier: contributor.github_identifier.and_then(|id| id.parse().ok()),
			github_username: contributor.github_username,
			discord_handle: contributor.discord_handle,
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
