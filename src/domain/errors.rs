use super::ApplicationRepositoryError;
use thiserror::Error;

#[derive(Debug, PartialEq, Eq)]
pub enum AnyError {
	ParseStatusError(String),
	ProjectListingError(String),
	ContributionStoreError(String),
	GetContributorError(String),
	TransactionRevertedError(String),
}

#[derive(Debug, Error)]
pub enum Error {
	#[error("Application repository error")]
	ApplicationRepository(#[from] ApplicationRepositoryError),
}

impl ToString for AnyError {
	fn to_string(&self) -> String {
		match self {
			AnyError::ParseStatusError(e) => e.to_owned(),
			AnyError::GetContributorError(e) => e.to_owned(),
			AnyError::ProjectListingError(e) => e.to_owned(),
			AnyError::ContributionStoreError(e) => e.to_owned(),
			AnyError::TransactionRevertedError(e) => e.to_owned(),
		}
	}
}

pub type AnyResult<T> = std::result::Result<T, AnyError>;
