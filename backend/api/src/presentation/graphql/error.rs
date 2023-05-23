/// Errors that can occur during user authentication and authorization
///
/// # Example
///
/// ```
/// use my_cool_app::{UserId, Error};
///
/// fn perform_action(user_id: UserId) -> Result<(), Error> {
///     if user_id.is_authenticated() {
///         if user_id.is_authorized_to_perform_action() {
///             // perform action
///             Ok(())
///         } else {
///             Err(Error::NotAuthorized(user_id, "User is not authorized to perform this action".into()))
///         }
///     } else {
///         Err(Error::NotAuthenticated("User is not authenticated".into()))
///     }
/// }
/// ```
use domain::{DomainError, UserId};

/// Errors that can occur during interaction with the database or web3
use infrastructure::{database::DatabaseError, web3::ens};

/// Errors that can occur during GraphQL request processing
use juniper::{graphql_value, DefaultScalarValue, FieldError, IntoFieldError};

/// Errors that can occur during user profile info update
use crate::application::user::update_profile_info::Error as UpdateProfileInfoError;

/// Logger macros
use olog::error;

/// The error type for authentication and authorization errors
#[derive(Debug, Error)]
pub enum Error {
    /// Caller should be authenticated
    #[error("Caller should be authenticated")]
    NotAuthenticated(String),

    /// User '{0}' is not authorized to perform this action
    #[error("User '{0}' is not authorized to perform this action")]
    NotAuthorized(UserId, String),

    /// Invalid GraphQL request
    #[error("Invalid GraphQL request")]
    InvalidRequest(#[source] anyhow::Error),

    /// Something went wrong on our side
    #[error("Something went wrong on our side")]
    InternalError(#[source] anyhow::Error),
}

impl From<DatabaseError> for Error {
    /// Converts `DatabaseError` into `Error`
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
    /// Converts `DomainError` into `Error`
    fn from(domain_error: DomainError) -> Self {
        match domain_error {
            DomainError::InternalError(e) => Self::InternalError(e),
            DomainError::InvalidInputs(e) => Self::InvalidRequest(e),
        }
    }
}

impl From<UpdateProfileInfoError> for Error {
    /// Converts `UpdateProfileInfoError` into `Error`
    fn from(error: UpdateProfileInfoError) -> Self {
        match error {
            UpdateProfileInfoError::Repository(e) => e.into(),
            UpdateProfileInfoError::Internal(e) => Self::InternalError(e),
            UpdateProfileInfoError::InvalidInput(e) => Self::InvalidRequest(e),
        }
    }
}

impl From<ens::Error> for Error {
    /// Converts `ens::Error` into `Error`
    fn from(error: ens::Error) -> Self {
        match error {
            ens::Error::InvalidProviderUrl(_) => Self::InternalError(error.into()),
            ens::Error::Contract(_) => Self::InternalError(error.into()),
            ens::Error::NotRegistered => Self::InvalidRequest(error.into()),
        }
    }
}

impl IntoFieldError for Error {
    /// Converts `Error` into `FieldError<DefaultScalarValue>`
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

/// A convenience alias for `std::result::Result<T, Error>`
pub type Result<T> = std::result::Result<T, Error>;