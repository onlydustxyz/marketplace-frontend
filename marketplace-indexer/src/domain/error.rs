use crate::domain::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	IndexerRepository(#[from] IndexerRepositoryError),
}
