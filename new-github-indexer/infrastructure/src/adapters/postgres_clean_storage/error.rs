use domain::ports::output::clean_storage;
use infrastructure::dbclient::DatabaseError;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Missing mandatory field: {0}")]
	MissingField(&'static str),
	#[error(transparent)]
	Serde(#[from] serde_json::Error),
	#[error(transparent)]
	Database(#[from] DatabaseError),
}

impl From<diesel::result::Error> for Error {
	fn from(error: diesel::result::Error) -> Self {
		Self::Database(error.into())
	}
}

impl From<Error> for clean_storage::Error {
	fn from(error: Error) -> Self {
		match error {
			Error::Database(_) => Self::Save(error.into()),
			Error::MissingField(_) | Error::Serde(_) => Self::InvalidData(error.into()),
		}
	}
}

pub type Result<T> = std::result::Result<T, Error>;
