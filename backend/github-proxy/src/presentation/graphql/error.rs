use juniper::{graphql_value, DefaultScalarValue, FieldError, IntoFieldError};
use olog::{error, warn};
use thiserror::Error;

use crate::domain::GithubServiceError;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Invalid GraphQL request")]
	InvalidRequest(#[source] anyhow::Error),
	#[error("Something went wrong on our side")]
	InternalError(#[source] anyhow::Error),
}

impl From<GithubServiceError> for Error {
	fn from(error: GithubServiceError) -> Self {
		match &error {
			GithubServiceError::MissingRepositoryOwner(_) => Error::InternalError(error.into()),
			GithubServiceError::NotFound(_) => Error::InvalidRequest(error.into()),
			GithubServiceError::Other(_) => Error::InternalError(error.into()),
		}
	}
}

impl IntoFieldError for Error {
	fn into_field_error(self) -> FieldError<DefaultScalarValue> {
		match &self {
			Self::InvalidRequest(_) => warn!(error = format!("{self:?}"), "Bad request"),
			Self::InternalError(_) => error!(error = format!("{self:?}"), "Error occured"),
		};

		let (msg, reason) = match &self {
			Self::InvalidRequest(source) | Self::InternalError(source) =>
				(self.to_string(), source.to_string()),
		};
		FieldError::new(msg, graphql_value!({ "reason": reason }))
	}
}

pub type Result<T> = std::result::Result<T, Error>;
