use diesel::result::Error as DieselError;
use std::num::ParseIntError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Connection(anyhow::Error),
	#[error(transparent)]
	Migration(anyhow::Error),
	#[error(transparent)]
	Transaction(#[from] DieselError),
	#[error(transparent)]
	Pool(#[from] r2d2::Error),
	#[error(transparent)]
	Parse(#[from] ParseIntError),
}
