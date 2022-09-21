use crate::domain::{Indexer, IndexerId};
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
	#[error("Indexer does not exist")]
	NotFound,
	#[error("Something happened at the infrastructure level")]
	Infrastructure(anyhow::Error),
}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn find_by_id(&self, indexer_id: &IndexerId) -> Result<Indexer, Error>;
	fn store(&self, indexer: Indexer) -> Result<(), Error>;
}
