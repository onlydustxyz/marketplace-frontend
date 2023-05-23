/**
* Error module provides error types for GitHub API client.
*
* `Error` is an enum that contains different types of errors.
* `NotFound` error occurs when requested resource is not found.
* `InvalidInput` error occurs when input parameters are invalid.
* `Other` error occurs for all other types of errors.
*/

use anyhow::anyhow;
use thiserror::Error;
use url::ParseError;

#[derive(Debug, Error)]
pub enum Error {
    #[error("Not found")]
    NotFound(#[source] anyhow::Error),

    #[error(transparent)]
    InvalidInput(anyhow::Error),

    #[error(transparent)]
    Other(anyhow::Error),
}

/**
* Implement the conversion from `octocrab::Error` to our `Error`.
* Handles different types of errors that may occur while interacting with the GitHub API using `Octocrab`.
*/
impl From<octocrab::Error> for Error {
    fn from(error: octocrab::Error) -> Self {
        match &error {
            octocrab::Error::Http {
                source,
                backtrace: _,
            } => {
                if source.is_decode() {
                    return match std::error::Error::source(&source) {
                        Some(source) if source.to_string().contains("EOF while parsing a value at line 1 column 0") =>
                            Error::NotFound(anyhow!(error)),

                        _ => Error::Other(anyhow!(error)),
                    };
                }
                match source.status() {
                    Some(status) if status == 404 => Error::NotFound(anyhow!(error)),
                    _ => Error::Other(anyhow!(error)),
                }
            },

            octocrab::Error::GitHub {
                source,
                backtrace: _,
            } => match source.message.as_str() {
                "Not Found" => Error::NotFound(anyhow!(error)),
                _ => Error::Other(anyhow!(error)),
            },
            _ => Error::Other(anyhow!(error)),
        }
    }
}

/**
* Implement the conversion from `ParseError` to `Error`.
* This error occurs when input fails to parse.
*/
impl From<ParseError> for Error {
    fn from(error: ParseError) -> Self {
        Self::InvalidInput(anyhow!(error))
    }
}

/**
* Implement the conversion from `serde_qs::Error` to `Error`.
* This error occurs when query string fails to parse.
*/
impl From<serde_qs::Error> for Error {
    fn from(error: serde_qs::Error) -> Self {
        Self::InvalidInput(anyhow!(error))
    }
}