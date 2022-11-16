use crate::{domain::*, infrastructure::database::models};
use anyhow::anyhow;
use diesel::{QueryDsl, RunQueryDsl};
use marketplace_infrastructure::database::{schema::users::dsl, Client, DatabaseError};
use tracing::error;
use uuid::Uuid;

impl ContributorProfileRepository for Client {
	fn upsert_github_user_data(
		&self,
		contributor: ContributorProfile,
	) -> Result<(), ContributorProfileRepositoryError> {
		let connection = self.connection().map_err(ContributorProfileRepositoryError::from)?;

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
	) -> Result<(), ContributorProfileRepositoryError> {
		let connection = self.connection().map_err(ContributorProfileRepositoryError::from)?;

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
	) -> Result<ContributorProfile, ContributorProfileRepositoryError> {
		let connection = self.connection().map_err(ContributorProfileRepositoryError::from)?;

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

impl From<DatabaseError> for ContributorProfileRepositoryError {
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

#[cfg(test)]
mod tests {
	use crate::{database::Client, domain::*};
	use marketplace_domain::ContributorDiscordHandle;
	use rstest::*;
	use std::str::FromStr;
	use testing::init_pool;
	use uuid::Uuid;

	#[fixture]
	fn database() -> Client {
		Client::new(init_pool())
	}

	#[fixture]
	fn user_id() -> Uuid {
		Uuid::from_str("3d863031-e9bb-42dc-becd-67999675fb8b").unwrap()
	}

	#[fixture]
	fn github_identifier() -> GithubUserId {
		990474
	}

	#[fixture]
	fn github_username() -> String {
		String::from("abuisset")
	}

	#[fixture]
	fn discord_handle() -> ContributorDiscordHandle {
		ContributorDiscordHandle::from("Antho#9314")
	}

	#[rstest]
	#[cfg_attr(
		not(feature = "with_infrastructure_tests"),
		ignore = "infrastructure test"
	)]
	fn github_then_discord(
		database: Client,
		user_id: Uuid,
		github_identifier: GithubUserId,
		github_username: String,
		discord_handle: ContributorDiscordHandle,
	) {
		{
			let contributor = ContributorProfile {
				id: user_id,
				github_identifier: Some(github_identifier),
				github_username: Some(github_username.clone()),
				..Default::default()
			};

			ContributorProfileRepository::upsert_github_user_data(&database, contributor)
				.expect("Unable to upsert contributor profile");
		}

		{
			let contributor = ContributorProfile {
				id: user_id,
				discord_handle: Some(discord_handle.clone()),
				..Default::default()
			};

			ContributorProfileRepository::upsert_discord_handle(&database, contributor)
				.expect("Unable to upsert contributor discord handle");
		}

		let contributor = ContributorProfileRepository::find_by_id(&database, &user_id)
			.expect("Unable to find contributor by account");

		assert_eq!(contributor.github_identifier, Some(github_identifier));
		assert_eq!(contributor.github_username, Some(github_username));
		assert_eq!(contributor.discord_handle, Some(discord_handle));
	}

	#[rstest]
	#[cfg_attr(
		not(feature = "with_infrastructure_tests"),
		ignore = "infrastructure test"
	)]
	fn discord_then_github(
		database: Client,
		user_id: Uuid,
		github_identifier: GithubUserId,
		github_username: String,
		discord_handle: ContributorDiscordHandle,
	) {
		{
			let contributor = ContributorProfile {
				id: user_id,
				discord_handle: Some(discord_handle.clone()),
				..Default::default()
			};

			ContributorProfileRepository::upsert_discord_handle(&database, contributor)
				.expect("Unable to upsert contributor discord handle");
		}

		{
			let contributor = ContributorProfile {
				id: user_id,
				github_identifier: Some(github_identifier),
				github_username: Some(github_username.clone()),
				..Default::default()
			};

			ContributorProfileRepository::upsert_github_user_data(&database, contributor)
				.expect("Unable to upsert contributor profile");
		}

		let contributor = ContributorProfileRepository::find_by_id(&database, &user_id)
			.expect("Unable to find contributor by account");

		assert_eq!(contributor.github_identifier, Some(github_identifier));
		assert_eq!(contributor.github_username, Some(github_username));
		assert_eq!(contributor.discord_handle, Some(discord_handle));
	}
}
