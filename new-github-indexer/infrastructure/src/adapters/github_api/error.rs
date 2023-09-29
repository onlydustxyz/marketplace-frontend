use domain::ports::output::github_api;

use super::Error;

impl From<Error> for github_api::Error {
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
