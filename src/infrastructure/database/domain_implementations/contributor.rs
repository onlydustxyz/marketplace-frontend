use std::str::FromStr;

use crate::{
	domain::*,
	infrastructure::database::{models, schema, schema::contributors, Client, DatabaseError},
};
use diesel::prelude::*;

impl ContributorRepository for Client {
	fn store(&self, contributor: Contributor) -> Result<(), ContributorRepositoryError> {
		let connection = self.connection().map_err(ContributorRepositoryError::from)?;

		let application = models::NewContributor::from(contributor);
		diesel::insert_into(contributors::table)
			.values(&application)
			.execute(&*connection)
			.map_err(ContributorRepositoryError::from)?;

		Ok(())
	}

	fn find(
		&self,
		contributor_id: ContributorId,
	) -> Result<Option<Contributor>, ContributorRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContributorRepositoryError::Infrastructure(e.into()))?;

		match contributors::table
			.find(contributor_id.to_string())
			.get_result::<models::Contributor>(&*connection)
		{
			Ok(contributor) => Ok(Some(contributor.into())),
			Err(diesel::NotFound) => Ok(None),
			Err(e) => Err(ContributorRepositoryError::Infrastructure(e.into())),
		}
	}

	fn update_contributor(
		&self,
		contributor_id: ContributorId,
		contributor: Contributor,
	) -> Result<(), ContributorRepositoryError> {
		let connection = self.connection().map_err(ContributorRepositoryError::from)?;

		diesel::update(schema::contributors::dsl::contributors)
			.filter(contributors::id.eq(contributor_id.to_string()))
			.set((
				schema::contributors::discord_handle.eq(match contributor.discord_handle {
					Some(discord_handle_) => discord_handle_,
					None => String::new(),
				}),
				schema::contributors::github_username.eq(match contributor.github_username {
					Some(github_username_) => github_username_,
					None => String::new(),
				}),
				schema::contributors::github_handle.eq(match contributor.github_handle {
					Some(github_handle_) => github_handle_,
					None => String::new(),
				}),
			))
			.execute(&*connection)
			.map_err(ContributorRepositoryError::from)?;

		Ok(())
	}
}

impl From<Contributor> for models::NewContributor {
	fn from(contributor: crate::domain::Contributor) -> Self {
		Self {
			id: contributor.id.to_string(),
			discord_handle: contributor.discord_handle,
			github_handle: contributor.github_handle,
			github_username: contributor.github_username,
		}
	}
}

impl From<models::Contributor> for Contributor {
	fn from(contributor: models::Contributor) -> Self {
		Self {
			id: ContributorId::from_str(contributor.id.as_str()).unwrap(),
			discord_handle: contributor.discord_handle,
			github_handle: contributor.github_handle,
			github_username: contributor.github_username,
		}
	}
}

impl From<DatabaseError> for ContributorRepositoryError {
	fn from(error: DatabaseError) -> Self {
		Self::Infrastructure(Box::new(error))
	}
}

impl From<diesel::result::Error> for ContributorRepositoryError {
	fn from(error: diesel::result::Error) -> Self {
		match error {
			diesel::result::Error::DatabaseError(kind, _) => match kind {
				diesel::result::DatabaseErrorKind::ForeignKeyViolation =>
					Self::InvalidEntity(Box::new(error)),
				_ => Self::Infrastructure(Box::new(error)),
			},
			diesel::result::Error::NotFound => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
