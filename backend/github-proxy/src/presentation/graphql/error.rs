use domain::GithubServiceError;

use juniper::{graphql_value, DefaultScalarValue, FieldError, IntoFieldError};

use olog::error;

use thiserror::Error;

/// Represents possible errors that can occur in this module.
#[derive(Debug, Error)]
pub enum Error {
    /// Indicates that the GraphQL request is invalid.
    #[error("Invalid GraphQL request")]
    InvalidRequest(#[source] anyhow::Error),

    /// Indicates an internal error on our side.
    #[error("Something went wrong on our side")]
    InternalError(#[source] anyhow::Error),
}

impl From<GithubServiceError> for Error {
    /// Converts a GithubServiceError into an Error.
    fn from(error: GithubServiceError) -> Self {
        match &error {
            GithubServiceError::MissingField(_) => Error::InternalError(error.into()),
            GithubServiceError::NotFound(_) => Error::InvalidRequest(error.into()),
            GithubServiceError::InvalidInput(_) => Error::InvalidRequest(error.into()),
            GithubServiceError::Other(_) => Error::InternalError(error.into()),
        }
    }
}

impl IntoFieldError for Error {
    /// Converts an Error into a FieldError.
    fn into_field_error(self) -> FieldError<DefaultScalarValue> {
        error!(error = format!("{self:?}"), "Error occurred");

        let (msg, reason) = match &self {
            Self::InvalidRequest(source) => (self.to_string(), source.to_string()),
            Self::InternalError(source) => (self.to_string(), source.to_string()),
        };
        FieldError::new(msg, graphql_value!({ "reason": reason }))
    }
}