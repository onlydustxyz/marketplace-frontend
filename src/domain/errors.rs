use super::{
	ApplicationRepositoryError, ApplicationServiceError, ContributionRepositoryError,
	ContributionServiceError, ContributorRepositoryError, OnchainContributionServiceError,
};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Application repository error")]
	ApplicationRepository(#[from] ApplicationRepositoryError),
	#[error("Contribution repository error")]
	ContributionRepository(#[from] ContributionRepositoryError),
	#[error("Contributor repository error")]
	ContributorRepository(#[from] ContributorRepositoryError),
	#[error("Onchain contribution service error")]
	OnchainContributionService(#[from] OnchainContributionServiceError),
	#[error("Application service error")]
	ApplicationService(#[from] ApplicationServiceError),
	#[error("Failed to take control of a lock")]
	Lock,
}
