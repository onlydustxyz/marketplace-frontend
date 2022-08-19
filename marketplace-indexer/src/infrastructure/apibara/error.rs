use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to connect to Apibara server")]
	Connection(#[from] tonic::transport::Error),
}
