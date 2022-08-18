use crate::{
	domain::*,
	infrastructure::database::{models, schema::contact_informations, Client, DatabaseError},
};
use diesel::prelude::*;
use std::str::FromStr;

impl ContactInformationRepository for Client {
	fn find_by_contributor_id(
		&self,
		contributor_id: ContributorId,
	) -> Result<Option<ContactInformation>, ContactInformationRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContactInformationRepositoryError::Infrastructure(e.into()))?;

		match contact_informations::dsl::contact_informations
			.filter(contact_informations::contributor_id.eq(contributor_id.to_string()))
			.get_result::<models::ContactInformation>(&*connection)
		{
			Ok(contact_information) => Ok(Some(contact_information.into())),
			Err(diesel::NotFound) => Ok(None),
			Err(e) => Err(ContactInformationRepositoryError::Infrastructure(e.into())),
		}
	}

	fn create(
		&self,
		contact_information: ContactInformation,
	) -> Result<(), ContactInformationRepositoryError> {
		let connection = self.connection().map_err(ContactInformationRepositoryError::from)?;

		let contact_information = models::ContactInformation::from(contact_information);
		diesel::insert_into(contact_informations::table)
			.values(&contact_information)
			.execute(&*connection)
			.map_err(ContactInformationRepositoryError::from)?;

		Ok(())
	}

	fn update(
		&self,
		contact_information: ContactInformation,
	) -> Result<(), ContactInformationRepositoryError> {
		let connection = self.connection().map_err(ContactInformationRepositoryError::from)?;

		let contact_information = models::ContactInformation::from(contact_information);
		diesel::update(
			contact_informations::table.filter(contact_informations::id.eq(contact_information.id)),
		)
		.set(contact_information)
		.execute(&*connection)
		.map_err(ContactInformationRepositoryError::from)?;
		Ok(())
	}
}

impl From<DatabaseError> for ContactInformationRepositoryError {
	fn from(error: DatabaseError) -> Self {
		Self::Infrastructure(Box::new(error))
	}
}

impl From<diesel::result::Error> for ContactInformationRepositoryError {
	fn from(error: diesel::result::Error) -> Self {
		match error {
			diesel::result::Error::DatabaseError(_, _) => Self::Infrastructure(Box::new(error)),
			diesel::result::Error::NotFound => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}

impl From<ContactInformation> for models::ContactInformation {
	fn from(contact_information: crate::domain::ContactInformation) -> Self {
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
			contributor_id: ContributorId::from_str(contact_information.contributor_id.as_str())
				.unwrap(),
			discord_handle: contact_information.discord_handle,
		}
	}
}
