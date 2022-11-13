use crate::database::{models, schema::users::dsl, Client, DatabaseError};
use anyhow::anyhow;
use diesel::{QueryDsl, RunQueryDsl};
use log::error;
use marketplace_domain::*;
use uuid::Uuid;

impl ContributorProjectionRepository for Client {
	fn upsert_github_user_data(
		&self,
		contributor: ContributorProfile,
	) -> Result<(), ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor = models::NewGithubContributor::from(contributor);

		diesel::insert_into(dsl::users)
			.values(&contributor)
			.on_conflict(dsl::id)
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

		diesel::insert_into(dsl::users)
			.values(&contributor)
			.on_conflict(dsl::id)
			.do_update()
			.set(&contributor)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert contributor {contributor:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn find_by_id(
		&self,
		id: &Uuid,
	) -> Result<ContributorProfile, ContributorProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributorProjectionRepositoryError::from)?;

		let contributor: models::Contributor =
			dsl::users.find(id).get_result(&*connection).map_err(DatabaseError::from)?;

		Ok(contributor.into())
	}
}

impl ProjectionRepository<ContributorProfile> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		self.clear_table(dsl::users)
			.map_err(|e| ProjectionRepositoryError::Infrastructure(e.into()))
	}
}

impl From<ContributorProfile> for models::NewGithubContributor {
	fn from(contributor: ContributorProfile) -> Self {
		Self {
			id: contributor.id,
			// safe to unwrap as only called when data is present
			github_identifier: contributor.github_identifier.unwrap().to_string(),
			github_username: contributor.github_username.unwrap(),
		}
	}
}

impl From<ContributorProfile> for models::NewDiscordContributor {
	fn from(contributor: ContributorProfile) -> Self {
		Self {
			id: contributor.id,
			// safe to unwrap as only called when data is present
			discord_handle: contributor.discord_handle.unwrap(),
		}
	}
}

impl From<models::Contributor> for ContributorProfile {
	fn from(contributor: models::Contributor) -> Self {
		Self {
			id: contributor.id,
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
