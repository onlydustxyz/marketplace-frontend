/// This module defines a custom error type `Error` and its corresponding `Result` type alias.
/// The `Error` type is used to represent various internal errors that may occur during the execution 
/// of the application. The `Result` type alias is used to return either a successful result or the `Error` 
/// type.
use domain::{GithubServiceError, PublisherError};
use infrastructure::database::DatabaseError;
use olog::warn;
use thiserror::Error;

use crate::domain::RepositoryError;

/// This `Error` enum is used to represent various internal errors that may occur during 
/// the execution of the application.
#[derive(Debug, Error)]
pub enum Error {
    /// Represents a `DatabaseError` type error.
    #[error("Internal Error")]
    Database(#[from] DatabaseError),
    /// Represents a `GithubServiceError` type error.
    #[error(transparent)]
    GithubService(#[from] GithubServiceError),
    /// Represents a `RepositoryError` type error.
    #[error(transparent)]
    Repository(#[from] RepositoryError),
    /// Represents a `PublisherError` type error.
    #[error("Internal Error")]
    Publisher(#[from] PublisherError),
    /// Represents a `serde_json::Error` type error.
    #[error("Internal Error")]
    Serialization(#[from] serde_json::Error),
    /// Represents an `anyhow::Error` type error.
    #[error("Internal Error")]
    Other(#[from] anyhow::Error),
}

/// This `Result` type alias is used to return either a successful result or an `Error` type.
pub type Result<T> = std::result::Result<T, Error>;

/// This trait is used to define the `ignore_non_fatal_errors` method for the `std::result::Result`
/// type when the error type for that `Result` is `GithubServiceError`.
pub trait IgnoreErrors {
    /// This method is used to ignore non-fatal `GithubServiceError` types in a `std::result::Result`
    /// instance and return a default value of the same type as the `Ok` variant.
    fn ignore_non_fatal_errors(self) -> Self;
}

impl<T: Default> IgnoreErrors for std::result::Result<T, GithubServiceError> {
    /// This method is used to ignore non-fatal `GithubServiceError` types in a `std::result::Result`
    /// instance and return a default value of the same type as the `Ok` variant.
    fn ignore_non_fatal_errors(self) -> Self {
        if let Err(error) = self {
            return match error {
                domain::GithubServiceError::NotFound(_)
                | domain::GithubServiceError::InvalidInput(_)
                | domain::GithubServiceError::MissingField(_) => {
                    warn!(error = error.to_string(), "This error was ignored");
                    Ok(T::default())
                },
                domain::GithubServiceError::Other(_) => Err(error),
            };
        }
        self
    }
}