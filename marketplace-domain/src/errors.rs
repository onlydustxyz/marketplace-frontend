use super::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Application repository error")]
	ApplicationProjectionRepository(#[from] ApplicationProjectionRepositoryError),
	#[error("Contribution repository error")]
	ContributionRepository(#[from] AggregateRootRepositoryError),
	#[error("Contribution projection repository error")]
	ContributionProjectionRepository(#[from] ContributionProjectionRepositoryError),
	#[error("Contact Information repository error")]
	ContactInformationRepository(#[from] ContactInformationRepositoryError),
	#[error("Onchain contribution service error")]
	OnchainContributionService(#[from] OnchainContributionServiceError),
	#[error("Failed to take control of a lock")]
	Lock,
	#[error("Event store error")]
	EventStoreError(#[from] EventStoreError),
	#[error(transparent)]
	ContributionError(#[from] ContributionError),
	#[error(transparent)]
	ContributorError(#[from] ContributorError),
}
