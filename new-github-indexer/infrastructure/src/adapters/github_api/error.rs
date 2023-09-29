use anyhow::anyhow;
use domain::ports::output::github_api;
use thiserror::Error;
use url::ParseError;

#[derive(Debug, Error)]
pub enum GithubApiAdapterError {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
	#[error(transparent)]
	InvalidInput(anyhow::Error),
	#[error(transparent)]
	Other(anyhow::Error),
}

impl From<GithubApiAdapterError> for github_api::Error {
	fn from(error: GithubApiAdapterError) -> Self {
		match error {
			GithubApiAdapterError::NotFound(e) => github_api::Error::NotFound(e),
			GithubApiAdapterError::InvalidInput(e) => github_api::Error::InvalidInput(e),
			GithubApiAdapterError::Other(e) => github_api::Error::Other(e),
		}
	}
}

impl From<octocrab_indexer::Error> for GithubApiAdapterError {
	fn from(error: octocrab_indexer::Error) -> Self {
		match &error {
			octocrab_indexer::Error::GitHub {
				source,
				backtrace: _,
			} => match source.message.as_str() {
				"Not Found" => GithubApiAdapterError::NotFound(anyhow!(error)),
				_ => GithubApiAdapterError::Other(anyhow!(error)),
			},
			_ => GithubApiAdapterError::Other(anyhow!(error)),
		}
	}
}

impl From<ParseError> for GithubApiAdapterError {
	fn from(error: ParseError) -> Self {
		Self::InvalidInput(anyhow!(error))
	}
}
