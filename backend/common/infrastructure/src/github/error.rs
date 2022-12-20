use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] octocrab::Error),
	#[error(transparent)]
	Other(octocrab::Error),
}

impl From<octocrab::Error> for Error {
	fn from(error: octocrab::Error) -> Self {
		match &error {
			octocrab::Error::Http {
				source,
				backtrace: _,
			} => match source.status() {
				Some(status) if status == 404 => Error::NotFound(error),
				_ => Error::Other(error),
			},
			_ => Error::Other(error),
		}
	}
}
