/**
* The `fetch` module provides a service for fetching information from external sources.
*/
mod fetch;

pub use fetch::{
    IssueService as FetchIssueService, 
    RepoService as FetchRepoService, 
    Service as FetchService,
    UserService as FetchUserService,
};

/**
* The `search` module provides a service for searching information.
*/
mod search;
pub use search::{Service as SearchService, UserService as SearchUserService};

pub mod filters;

pub use filters::IssueFilters;

/**
* This struct represents the possible errors that can occur while executing the service.
*/
use thiserror::Error;
#[derive(Debug, Error)]
pub enum Error {
    #[error("Not found")]
    NotFound(#[source] anyhow::Error),
    #[error("Invalid input")]
    InvalidInput(#[source] anyhow::Error),
    #[error("Field '{0}' is not present")]
    MissingField(String),
    #[error("Internal error")]
    Other(#[source] anyhow::Error),
}

/**
* This trait defines the result returned by the service.
*/
pub type Result<T> = std::result::Result<T, Error>;

/**
* This trait provides service for fetching and searching information.
*/
pub trait Service: FetchService + SearchService {}

impl<S: FetchService + SearchService> Service for S {}

/**
* Convert Error to SubscriberCallbackError
*/
impl From<Error> for SubscriberCallbackError {
    fn from(error: Error) -> Self {
        match error {
            Error::NotFound(_) | Error::MissingField(_) | Error::InvalidInput(_) =>
                Self::Discard(error.into()),
            Error::Other(_) => Self::Fatal(error.into()),
        }
    }
}