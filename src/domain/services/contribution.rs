use std::sync::{Arc, RwLock};

use crate::domain::*;
use mapinto::ResultMapErrInto;
use mockall::automock;

#[automock]
pub trait Service: Send + Sync {
	fn apply(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct ContributionService {
	contribution_repository: Arc<dyn ContributionRepository>,
	application_repository: Arc<dyn ApplicationRepository>,
	uuid_generator: Arc<RwLock<dyn UuidGenerator>>,
}

impl Service for ContributionService {
	fn apply(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		let contribution = self
			.contribution_repository
			.find_by_id(contribution_id)
			.map_err(DomainError::from)?
			.ok_or_else(|| DomainError::from(ContributionRepositoryError::NotFound))?;

		if contribution.status != ContributionStatus::Open {
			return Err(
				ApplicationServiceError::InvalidContributionStatus(contribution.status).into(),
			);
		}

		let uuid = self.uuid_generator.write().map_err(|_| DomainError::Lock)?.new_uuid();

		let application = Application::new(
			uuid.into(),
			*contribution_id,
			*contributor_id,
			ApplicationStatus::Pending,
		);

		self.application_repository.store(application).map_err_into()
	}
}
