use crate::{
	domain::*,
	infrastructure::database::{models, schema::contributors, Client, DatabaseError},
};
use diesel::prelude::*;

impl ContributorRepository for Client {
	fn find(
		&self,
		contributor_id: ContributorId,
	) -> Result<Option<Contributor>, ContributorRepositoryError> {
		// TODO: Target contributors table once implemented
		Ok(Some(Contributor {
			id: contributor_id,
			discord_handle: None,
			github_handle: None,
			github_username: None,
		}))
	}

	fn save_contact_information(
		&self,
		contributor_id: ContributorId,
		contact_information: ContactInformation,
	) -> Result<(), ContributorRepositoryError> {
		let connection = self.connection().map_err(ContributorRepositoryError::from)?;

		let contributor = models::Contributor {
			id: contributor_id.to_string(),
			discord_handle: contact_information.discord_handle,
		};

		diesel::insert_into(contributors::table)
			.values(&contributor)
			.on_conflict(contributors::id)
			.do_update()
			.set(&contributor)
			.execute(&*connection)
			.map_err(ContributorRepositoryError::from)?;

		Ok(())
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
				_ => Self::Infrastructure(Box::new(error)),
			},
			diesel::result::Error::NotFound => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
