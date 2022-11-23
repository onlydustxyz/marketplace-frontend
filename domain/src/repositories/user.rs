#[cfg(test)]
use mockall::automock;
use thiserror::Error;

use crate::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("User does not exist")]
	NotFound,
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn find_by_id(&self, id: &UserId) -> Result<User, Error>;
}
