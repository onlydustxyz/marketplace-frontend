use mockall::automock;

use thiserror::Error;

use crate::domain::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contributor not found")]
	NotFound,
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

#[automock]
pub trait Repository: Send + Sync {
	fn save_contact_information(
		&self,
		contributor_id: ContributorId,
		contact_information: ContactInformation,
	) -> Result<(), Error>;

	fn find(&self, contributor_id: ContributorId) -> Result<Option<Contributor>, Error>;
}
