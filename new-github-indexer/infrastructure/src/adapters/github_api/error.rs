use domain::ports::output::raw_storage;

use super::Error;

impl From<Error> for raw_storage::Error {
	fn from(error: Error) -> Self {
		match &error {
			Error::Octocrab(e) => match e {
				octocrab_indexer::Error::GitHub { source, .. } if source.message == "Not Found" =>
					Self::NotFound(error.into()),
				_ => Self::Other(error.into()),
			},
			Error::InvalidUri => Self::Other(error.into()),
		}
	}
}
