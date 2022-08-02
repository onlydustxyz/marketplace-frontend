use super::{
	ApplicationRepositoryError, ContributionRepositoryError, ContributionServiceError,
	ContributorRepositoryError,
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
	#[error("Contribution service error")]
	ContributionService(#[from] ContributionServiceError),
}
