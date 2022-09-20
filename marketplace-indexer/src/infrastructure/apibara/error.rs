use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Connect(#[from] tonic::transport::Error),
	#[error(transparent)]
	Stream(#[from] tonic::Status),
}
