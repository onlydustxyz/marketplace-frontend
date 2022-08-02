use crate::domain::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

pub trait Repository: Send + Sync {
	fn find(&self, contributor_id: ContributorId) -> Result<Option<Contributor>, Error>;
}
