use anyhow::Result;
use async_trait::async_trait;
use domain::DomainError;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;
use url::Url;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Original image not found")]
	NotFound(#[source] anyhow::Error),
	#[error("Could not determine file extension")]
	UnknownExtension(#[source] anyhow::Error),
	#[error(transparent)]
	Other(anyhow::Error),
}

impl From<Error> for DomainError {
	fn from(error: Error) -> Self {
		match error {
			Error::NotFound(_) => DomainError::InvalidInputs(error.into()),
			Error::UnknownExtension(_) => DomainError::InvalidInputs(error.into()),
			Error::Other(_) => DomainError::InternalError(error.into()),
		}
	}
}

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn store_image(&self, original_image_url: &Url) -> Result<Url, Error>;
}
