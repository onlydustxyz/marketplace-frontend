/// This module contains the definition of the `Error` type and its related types.
use anyhow::anyhow;
use thiserror::Error;

use crate::{DomainError, SubscriberCallbackError};

/// An error that can occur when working with users.
#[derive(Debug, Error)]
pub enum Error {
    /// The user was not found.
    #[error("User not found")]
    NotFound,
    /// An error occured that is not specific to user management.
    #[error(transparent)]
    Other(#[from] anyhow::Error),
}

/// A specialized `Result` type for this module.
pub type Result<T> = std::result::Result<T, Error>;

impl From<Error> for SubscriberCallbackError {
    /// Converts an `Error` into a `SubscriberCallbackError`.
    fn from(error: Error) -> Self {
        match error {
            Error::NotFound => Self::Discard(anyhow!(error)),
            Error::Other(_) => Self::Fatal(anyhow!(error)),
        }
    }
}

impl From<Error> for DomainError {
    /// Converts an `Error` into a `DomainError`.
    fn from(error: Error) -> Self {
        match error {
            Error::NotFound => Self::InternalError(anyhow!(error)),
            Error::Other(_) => Self::InternalError(anyhow!(error)),
        }
    }
}