/// Error types related to domain logic.
use thiserror::Error;
use crate::{AggregateRootRepositoryError, GithubServiceError, PublisherError};

#[derive(Debug, Error)]
pub enum DomainError {
    /// An internal error occurred in the domain logic.
    #[error(transparent)]
    InternalError(anyhow::Error),
    /// Invalid inputs were provided to the domain logic.
    #[error(transparent)]
    InvalidInputs(anyhow::Error),
}

impl From<AggregateRootRepositoryError> for DomainError {
    /// Convert an `AggregateRootRepositoryError` to a `DomainError`.
    fn from(aggregate_root_repository_error: AggregateRootRepositoryError) -> Self {
        match aggregate_root_repository_error {
            AggregateRootRepositoryError::NotFound =>
                Self::InvalidInputs(aggregate_root_repository_error.into()),
            AggregateRootRepositoryError::EventStoreError(e) => Self::InternalError(e.into()),
        }
    }
}

impl From<PublisherError> for DomainError {
    /// Convert a `PublisherError` to a `DomainError`.
    fn from(publisher_error: PublisherError) -> Self {
        Self::InternalError(publisher_error.into())
    }
}

impl From<GithubServiceError> for DomainError {
    /// Convert a `GithubServiceError` to a `DomainError`.
    fn from(error: GithubServiceError) -> Self {
        match error {
            GithubServiceError::NotFound(_) | GithubServiceError::InvalidInput(_) =>
                Self::InvalidInputs(error.into()),
            GithubServiceError::MissingField(_) | GithubServiceError::Other(_) =>
                Self::InternalError(error.into()),
        }
    }
}

/// Extension trait for logging errors in `Result` types.
pub trait LogErr {
    /// Logs an error if the result is an `Err`, then returns the result.
    fn log_err(self, message: &str) -> Self;
}

impl<T, E: ToString> LogErr for Result<T, E> {
    fn log_err(self, message: &str) -> Self {
        if let Err(error) = &self {
            olog::error!(error = error.to_string(), message);
        }
        self
    }
}