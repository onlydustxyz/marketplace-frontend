use crate::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Project not found")]
	NotFound,
	#[error("Project already exist")]
	AlreadyExist(#[source] Box<dyn std::error::Error>),
	#[error("Project contains invalid members")]
	InvalidEntity(#[source] Box<dyn std::error::Error>),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

pub trait Repository {
	fn find_all_with_contributions(&self) -> Result<Vec<ProjectWithContributions>, Error>;
}
