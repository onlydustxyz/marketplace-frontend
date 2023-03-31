mod fetch;
pub use fetch::{
	IssueService as FetchIssueService, RepoService as FetchRepoService, Service as FetchService,
	UserService as FetchUserService,
};

mod search;
pub use search::{
	IssueService as SearchIssueService, Service as SearchService, UserService as SearchUserService,
};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
	#[error("Field '{0}' is not present")]
	MissingField(String),
	#[error("Internal error")]
	Other(#[source] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

pub trait Service: FetchService + SearchService {}

impl<S: FetchService + SearchService> Service for S {}
