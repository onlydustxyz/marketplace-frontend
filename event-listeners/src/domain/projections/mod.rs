use marketplace_domain::Aggregate;
use thiserror::Error;

mod contributor_profile;
pub use contributor_profile::{
	ContributorProfile, Error as ContributorProfileRepositoryError,
	Repository as ContributorProfileRepository,
};

#[cfg(test)]
pub use contributor_profile::MockRepository as MockContributorProfileRepository;

pub trait Projection {
	type A: Aggregate;
}

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

pub trait Repository<P: Projection>: Send + Sync {
	fn clear(&self) -> Result<(), Error>;
}
