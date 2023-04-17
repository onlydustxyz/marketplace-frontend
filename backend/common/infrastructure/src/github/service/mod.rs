mod fetch;
pub mod query_params;
mod search;

use domain::GithubServiceError;
pub use query_params::QueryParams;

use crate::github;

impl From<github::Error> for GithubServiceError {
	fn from(error: github::Error) -> Self {
		match error {
			github::Error::InvalidInput(error) => GithubServiceError::InvalidInput(error),
			github::Error::NotFound(error) => GithubServiceError::NotFound(error),
			github::Error::Other(error) => GithubServiceError::Other(error),
		}
	}
}
