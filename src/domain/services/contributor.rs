use std::sync::Arc;

use crate::domain::*;
use mockall::automock;

#[automock]
pub trait Service: Send + Sync {
	fn add_contact_information(
		&self,
		contributor_id: &ContributorId,
		contact_information: ContactInformation,
	) -> Result<(), DomainError>;
}

pub struct ContributorService {
	contributor_repository: Arc<dyn ContributorRepository>,
}

impl ContributorService {
	pub fn new(contributor_repository: Arc<dyn ContributorRepository>) -> Self {
		Self {
			contributor_repository,
		}
	}
}

impl Service for ContributorService {
	fn add_contact_information(
		&self,
		contributor_id: &ContributorId,
		contact_information: ContactInformation,
	) -> Result<(), DomainError> {
		self.contributor_repository
			.save_contact_information(*contributor_id, contact_information)
			.map_err(DomainError::from)?;
		Ok(())
	}
}
