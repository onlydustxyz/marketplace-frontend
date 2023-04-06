use anyhow::anyhow;
use thiserror::Error;
use url::ParseError;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
	#[error(transparent)]
	InvalidInput(anyhow::Error),
	#[error(transparent)]
	Other(anyhow::Error),
}

impl From<octocrab::Error> for Error {
	fn from(error: octocrab::Error) -> Self {
		match &error {
			octocrab::Error::Http {
				source,
				backtrace: _,
			} => match source.status() {
				Some(status) if status == 404 => Error::NotFound(anyhow!(error)),
				_ => Error::Other(anyhow!(error)),
			},
			octocrab::Error::GitHub {
				source,
				backtrace: _,
			} => match source.message.as_str() {
				"Not Found" => Error::NotFound(anyhow!(error)),
				_ => Error::Other(anyhow!(error)),
			},
			_ => Error::Other(anyhow!(error)),
		}
	}
}

impl From<ParseError> for Error {
	fn from(error: ParseError) -> Self {
		Self::InvalidInput(anyhow!(error))
	}
}

impl From<serde_qs::Error> for Error {
	fn from(error: serde_qs::Error) -> Self {
		Self::InvalidInput(anyhow!(error))
	}
}
