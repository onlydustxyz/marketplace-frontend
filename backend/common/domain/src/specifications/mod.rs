use thiserror::Error;

use crate::*;

mod aggregate_exists;
#[cfg(test)]
pub use aggregate_exists::MockProjectExists;
pub use aggregate_exists::ProjectExists;

mod github_repo_exists;
#[cfg(test)]
pub use github_repo_exists::MockSpecification as MockGithubRepoExists;
pub use github_repo_exists::Specification as GithubRepoExists;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
	#[error(transparent)]
	Infrastructure(anyhow::Error),
}
