//! Provides error types and conversions for GraphQL API.
//!
//! # Examples
//!
//! ```
//! use my_app::{Error, Result};
//! use juniper::FieldError;
//!
//! fn my_resolver() -> Result<String> {
//!     Err(Error::InvalidRequest(anyhow::anyhow!("Oops!")))
//! }
//!
//! #[juniper::graphql_object]
//! impl MyType {
//!     #[graphql(name = "myField")]
//!     fn my_field(&self) -> Result<String> {
//!         my_resolver()
//!     }
//! }
//!
//! type Schema = juniper::RootNode<'static, MyType, juniper::EmptyMutation<MyType>>;
//! let schema = Schema::new(MyType {}, juniper::EmptyMutation::new());
//!
//! let query = r#"{ myField }"#;
//! let result = juniper::execute(query, None, &schema, &juniper::Variables::new(), &())
//!     .map_err(|e| Error::Internal(e.into()))?;
//!
//! assert_eq!(
//!     result,
//!     serde_json::json!({
//!         "data": {
//!             "myField": null
//!         },
//!         "errors": [
//!             {
//!                 "message": "Invalid GraphQL request",
//!                 "locations": [
//!                     {
//!                         "line": 1,
//!                         "column": 3
//!                     }
//!                 ],
//!                 "path": [
//!                     "myField"
//!                 ],
//!                 "extensions": {
//!                     "reason": "Oops!"
//!                 }
//!             }
//!         ]
//!     })
//! );
//! ```

use domain::GithubServiceError;
use juniper::{graphql_value, DefaultScalarValue, FieldError, IntoFieldError};
use olog::error;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
    #[error("Invalid GraphQL request")]
    InvalidRequest(#[source] anyhow::Error),
    #[error("Something went wrong on our side")]
    Internal(#[source] anyhow::Error),
}

impl IntoFieldError for Error {
    /// Converts the error to a Juniper `FieldError`.
    fn into_field_error(self) -> FieldError<DefaultScalarValue> {
        error!(error = format!("{self:?}"), "Error occured");

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

/// A specialized `Result` type for the GraphQL API.
pub type Result<T> = std::result::Result<T, Error>;