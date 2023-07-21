use domain::GithubServiceError;
use juniper::{graphql_value, DefaultScalarValue, FieldError, IntoFieldError};
use olog::{error, IntoField};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Invalid GraphQL request")]
	InvalidRequest(#[source] anyhow::Error),
	#[error("Something went wrong on our side")]
	Internal(#[source] anyhow::Error),
}

impl IntoFieldError for Error {
	fn into_field_error(self) -> FieldError<DefaultScalarValue> {
		error!(error = self.to_field(), "Error occured");

		let (msg, reason) = match &self {
			Self::InvalidRequest(source) => (self.to_string(), source.to_string()),
			Self::Internal(source) => (self.to_string(), source.to_string()),
		};
		FieldError::new(msg, graphql_value!({ "reason": reason }))
	}
}

impl From<GithubServiceError> for Error {
	fn from(error: GithubServiceError) -> Self {
		match error {
			GithubServiceError::NotFound(_) | GithubServiceError::InvalidInput(_) =>
				Self::InvalidRequest(error.into()),
			GithubServiceError::MissingField(_) | GithubServiceError::Other(_) =>
				Self::Internal(error.into()),
		}
	}
}

pub type Result<T> = std::result::Result<T, Error>;
