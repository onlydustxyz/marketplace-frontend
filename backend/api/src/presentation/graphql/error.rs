use domain::{DomainError, UserId};
use infrastructure::{database::DatabaseError, web3::ens};
use juniper::{graphql_value, DefaultScalarValue, FieldError, IntoFieldError};
use olog::error;
use thiserror::Error;

use crate::application::user::update_profile_info::Error as UpdateProfileInfoError;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Caller should be authenticated")]
	NotAuthenticated(String),
	#[error("User '{0}' is not authorized to perform this action")]
	NotAuthorized(UserId, String),
	#[error("Invalid GraphQL request")]
	InvalidRequest(#[source] anyhow::Error),
	#[error("Something went wrong on our side")]
	InternalError(#[source] anyhow::Error),
}

impl From<DatabaseError> for Error {
	fn from(database_error: DatabaseError) -> Self {
		match database_error {
			DatabaseError::Connection(e) => Error::InternalError(e),
			DatabaseError::Migration(e) => Error::InternalError(e),
			DatabaseError::Transaction(e) => Error::InvalidRequest(e.into()),
			DatabaseError::Pool(e) => Error::InternalError(e.into()),
		}
	}
}

impl From<DomainError> for Error {
	fn from(usecase_error: DomainError) -> Self {
		match usecase_error {
			DomainError::InternalError(e) => Self::InternalError(e),
			DomainError::InvalidInputs(e) => Self::InvalidRequest(e),
		}
	}
}

impl From<UpdateProfileInfoError> for Error {
	fn from(error: UpdateProfileInfoError) -> Self {
		match error {
			UpdateProfileInfoError::Repository(e) => e.into(),
			UpdateProfileInfoError::Internal(e) => Self::InternalError(e),
			UpdateProfileInfoError::InvalidInput(e) => Self::InvalidRequest(e),
		}
	}
}

impl From<ens::Error> for Error {
	fn from(error: ens::Error) -> Self {
		match error {
			ens::Error::InvalidProviderUrl(_) => Self::InternalError(error.into()),
			ens::Error::Contract(_) => Self::InternalError(error.into()),
			ens::Error::NotRegistered => Self::InvalidRequest(error.into()),
		}
	}
}

impl IntoFieldError for Error {
	fn into_field_error(self) -> FieldError<DefaultScalarValue> {
		error!(error = format!("{self:?}"), "Error occured");

		let (msg, reason) = match &self {
			Self::NotAuthenticated(reason) => (self.to_string(), reason.clone()),
			Self::NotAuthorized(_, reason) => (self.to_string(), reason.clone()),
			Self::InvalidRequest(source) => (self.to_string(), source.to_string()),
			Self::InternalError(source) => (self.to_string(), source.to_string()),
		};
		FieldError::new(msg, graphql_value!({ "reason": reason }))
	}
}

pub type Result<T> = std::result::Result<T, Error>;
