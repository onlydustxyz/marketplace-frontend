use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("User not found")]
	NotFound,
	#[error(transparent)]
	Other(#[from] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;
