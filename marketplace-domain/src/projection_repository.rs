use crate::Projection;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

pub trait ProjectionRepository<P: Projection>: Send + Sync {
	fn clear(&self) -> Result<(), Error>;
}
