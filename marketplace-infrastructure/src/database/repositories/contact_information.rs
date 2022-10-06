use log::error;
use marketplace_domain::*;

use crate::database::{models, schema::contact_information::dsl, Client, DatabaseError};
use diesel::prelude::*;
use std::str::FromStr;

impl ContactInformationRepository for Client {
	fn find_by_contributor_id(
		&self,
		contributor_id: &ContributorAccount,
	) -> Result<Option<ContactInformation>, ContactInformationRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContactInformationRepositoryError::Infrastructure(e.into()))?;

		match dsl::contact_information
			.filter(dsl::contributor_id.eq(contributor_id.to_string()))
			.get_result::<models::ContactInformation>(&*connection)
		{
			Ok(contact_information) => Ok(Some(contact_information.into())),
			Err(diesel::NotFound) => Ok(None),
			Err(e) => Err(ContactInformationRepositoryError::Infrastructure(e.into())),
		}
	}

	fn upsert(
		&self,
		contact_information: ContactInformation,
	) -> Result<(), ContactInformationRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContactInformationRepositoryError::Infrastructure(e.into()))?;

		let contact_information = models::ContactInformation::from(contact_information);

		diesel::insert_into(dsl::contact_information)
			.values(&contact_information)
			.on_conflict(dsl::contributor_id)
			.do_update()
			.set(dsl::discord_handle.eq(&contact_information.discord_handle))
			.execute(&*connection)
			.map_err(|e| {
				error!(
					"Failed to set discord handle contact_information {contact_information:?}: {e}"
				);
				DatabaseError::from(e)
			})?;

		Ok(())
	}
}

impl From<DatabaseError> for ContactInformationRepositoryError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Transaction(diesel::result::Error::DatabaseError(_, _)) =>
				Self::Infrastructure(Box::new(error)),
			DatabaseError::Transaction(diesel::result::Error::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}

impl From<ContactInformation> for models::ContactInformation {
	fn from(contact_information: marketplace_domain::ContactInformation) -> Self {
		Self {
			id: contact_information.id.into(),
			contributor_id: contact_information.contributor_id.to_string(),
			discord_handle: contact_information.discord_handle,
		}
	}
}

impl From<models::ContactInformation> for ContactInformation {
	fn from(contact_information: models::ContactInformation) -> Self {
		Self {
			id: contact_information.id.into(),
			contributor_id: ContributorAccount::from_str(
				contact_information.contributor_id.as_str(),
			)
			.unwrap(),
			discord_handle: contact_information.discord_handle,
		}
	}
}
