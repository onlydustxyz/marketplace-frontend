use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contributor not found")]
	NotFound,
	#[error("Contributor already exist")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Contributor contains invalid members")]
	InvalidEntity(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

pub trait Repository {}
