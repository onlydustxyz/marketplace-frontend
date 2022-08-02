use mockall::automock;

use crate::domain::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

#[automock]
pub trait Repository: Send + Sync {
	fn find(&self, contributor_id: ContributorId) -> Result<Option<Contributor>, Error>;
}
