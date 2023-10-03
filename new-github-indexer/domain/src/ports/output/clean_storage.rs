use thiserror::Error;

use crate::models::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to connect to the storage")]
	Connection(anyhow::Error),
	#[error("Unable to save in the storage")]
	Save(anyhow::Error),
	#[error("Provided data is invalid")]
	InvalidData(anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

#[cfg_attr(test, automock)]
pub trait Port: Send + Sync {
	fn save_repo(&self, repo: indexed::Repository) -> Result<()>;

	fn save_issue(&self, repo: Repository, issue: indexed::Issue) -> Result<()>;

	fn save_pull_request(&self, repo: Repository, pull_request: indexed::PullRequest)
	-> Result<()>;

	fn save_user(&self, user: indexed::User) -> Result<()>;
}
