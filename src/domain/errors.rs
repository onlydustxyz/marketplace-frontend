use super::{ApplicationRepositoryError, ContributionRepositoryError};
use thiserror::Error;

#[derive(Debug, PartialEq, Eq)]
pub enum AnyError {
	TransactionRevertedError(String),
	InvalidContribution(String),
	InternalError(String),
}

#[derive(Debug, Error)]
pub enum Error {
	#[error("Application repository error")]
	ApplicationRepository(#[from] ApplicationRepositoryError),
	#[error("Application repository error")]
	ContributionRepository(#[from] ContributionRepositoryError),
}

impl ToString for AnyError {
	fn to_string(&self) -> String {
		match self {
			AnyError::TransactionRevertedError(e) => e.to_owned(),
			AnyError::InvalidContribution(e) => e.to_owned(),
			AnyError::InternalError(e) => e.to_owned(),
		}
	}
}

pub type AnyResult<T> = std::result::Result<T, AnyError>;
