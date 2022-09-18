use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Transport(#[from] tonic::transport::Error),
	#[error(transparent)]
	Server(#[from] tonic::Status),
	#[error("Invalidate response received from node for sequence: {sequence}")]
	Invalidate { sequence: u64 },
}
