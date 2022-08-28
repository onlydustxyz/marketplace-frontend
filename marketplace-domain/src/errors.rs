use super::{
	ApplicationRepositoryError, ApplicationServiceError, ContactInformationRepositoryError,
	ContributionAggregateRootRepositoryError, ContributionProjectionRepositoryError,
	ContributionServiceError, OnchainContributionServiceError,
};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Application repository error")]
	ApplicationRepository(#[from] ApplicationRepositoryError),
	#[error("Contribution aggregate root repository error")]
	ContributionAggregateRootRepository(#[from] ContributionAggregateRootRepositoryError),
	#[error("Contribution projection repository error")]
	ContributionProjectionRepository(#[from] ContributionProjectionRepositoryError),
	#[error("Contact Information repository error")]
	ContactInformationRepository(#[from] ContactInformationRepositoryError),
	#[error("Onchain contribution service error")]
	OnchainContributionService(#[from] OnchainContributionServiceError),
	#[error("Application service error")]
	ApplicationService(#[from] ApplicationServiceError),
	#[error("Contribution service error")]
	ContributionService(#[from] ContributionServiceError),
	#[error("Failed to take control of a lock")]
	Lock,
}
