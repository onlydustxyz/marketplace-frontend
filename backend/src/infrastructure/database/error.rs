use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to connect to the database")]
	Connection(String),
	#[error("Unable to migrate the database")]
	Migration(String),
}
