use mockall::automock;

use thiserror::Error;

use crate::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contact information not found")]
	NotFound,
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

#[automock]
pub trait Repository: Send + Sync {
	fn upsert(&self, contact_information: ContactInformation) -> Result<(), Error>;

	fn find_by_contributor_id(
		&self,
		contributor_id: &ContributorId,
	) -> Result<Option<ContactInformation>, Error>;
}
