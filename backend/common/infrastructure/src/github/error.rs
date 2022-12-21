use anyhow::anyhow;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
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
			_ => Error::Other(anyhow!(error)),
		}
	}
}
