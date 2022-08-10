use std::sync::{Arc, RwLock};

use crate::domain::*;
use mapinto::ResultMapErrInto;

// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
pub trait Usecase: Send + Sync {
	fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct ApplyToContribution {
	application_repository: Arc<dyn ApplicationRepository>,
	contribution_repository: Arc<dyn ContributionRepository>,
	uuid_generator: Arc<RwLock<dyn UuidGenerator>>,
}

impl ApplyToContribution {
	pub fn new_usecase_boxed(
		application_repository: Arc<dyn ApplicationRepository>,
		contribution_repository: Arc<dyn ContributionRepository>,
		uuid_generator: Arc<RwLock<dyn UuidGenerator>>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			application_repository,
			contribution_repository,
			uuid_generator,
		})
	}
}

impl Usecase for ApplyToContribution {
	fn apply_to_contribution(
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
