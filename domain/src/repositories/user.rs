use async_trait::async_trait;
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
#[async_trait]
pub trait Repository: Send + Sync {
	async fn find_by_id(&self, id: &UserId) -> Result<User, Error>;
}
