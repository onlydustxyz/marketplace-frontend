use anyhow::Result;
use async_trait::async_trait;
use domain::DomainError;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;
use url::Url;

/// Possible errors that can occur while storing an image.
#[derive(Debug, Error)]
pub enum Error {
    /// The original image could not be found at the provided URL.
    #[error("Original image not found")]
    NotFound(#[source] anyhow::Error),
    /// Could not determine the file extension of the image.
    #[error("Could not determine file extension")]
    UnknownExtension(#[source] anyhow::Error),
    /// Other errors that can occur while storing an image.
    #[error(transparent)]
    Other(anyhow::Error),
}

impl From<Error> for DomainError {
    /// Convert Error into DomainError.
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
/// A trait defining operations for storing an image.
pub trait Service: Send + Sync {
    /// Store an image at the provided URL and returns the URL where it is stored.
    async fn store_image(&self, original_image_url: &Url) -> Result<Url, Error>;
}