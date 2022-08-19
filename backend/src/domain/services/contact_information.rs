use std::sync::Arc;

use crate::domain::*;
use mockall::automock;
use uuid::Uuid;

#[automock]
pub trait Service: Send + Sync {
	fn set_contributor_contact_information(
		&self,
		contributor_id: &ContributorId,
		discord_handle: Option<String>,
	) -> Result<(), DomainError>;

	fn get_contributor_contact_information(
		&self,
		contributor_id: &ContributorId,
	) -> Result<Option<ContactInformation>, DomainError>;
}

pub struct ContactInformationService {
	contact_information_repository: Arc<dyn ContactInformationRepository>,
}

impl ContactInformationService {
	pub fn new(contact_information_repository: Arc<dyn ContactInformationRepository>) -> Self {
		Self {
			contact_information_repository,
		}
	}
}

impl Service for ContactInformationService {
	fn set_contributor_contact_information(
		&self,
		contributor_id: &ContributorId,
		discord_handle: Option<String>,
	) -> Result<(), DomainError> {
		let contact_information = self
			.contact_information_repository
			.find_by_contributor_id(*contributor_id)
			.map_err(DomainError::from)?;

		if let Some(mut contact_information) = contact_information {
			contact_information.discord_handle = discord_handle;
			self.contact_information_repository
				.update(contact_information)
				.map_err(DomainError::from)?;
		} else {
			let contact_information = ContactInformation {
				id: Uuid::new_v4().into(),
				contributor_id: *contributor_id,
				discord_handle,
			};
			self.contact_information_repository
				.create(contact_information)
				.map_err(DomainError::from)?;
		}

		Ok(())
	}

	fn get_contributor_contact_information(
		&self,
		contributor_id: &ContributorId,
	) -> Result<Option<ContactInformation>, DomainError> {
		let contact_information = self
			.contact_information_repository
			.find_by_contributor_id(*contributor_id)
			.map_err(DomainError::from)?;

		Ok(contact_information)
	}
}
