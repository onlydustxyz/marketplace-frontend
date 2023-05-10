use anyhow::anyhow;
use infrastructure::database::DatabaseError;

use crate::domain::RepositoryError;

impl From<DatabaseError> for RepositoryError {
	fn from(error: DatabaseError) -> Self {
		Self::Other(anyhow!(error))
	}
}

impl From<diesel::result::Error> for RepositoryError {
	fn from(error: diesel::result::Error) -> Self {
		Self::Other(anyhow!(error))
	}
}
