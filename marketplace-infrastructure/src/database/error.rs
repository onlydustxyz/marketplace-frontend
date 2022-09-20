use diesel::result::Error as DieselError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Connection(anyhow::Error),
	#[error(transparent)]
	Migration(anyhow::Error),
	#[error(transparent)]
	Transaction(#[from] DieselError),
}
