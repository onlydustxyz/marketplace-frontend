use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
	#[error("Failed to interact with Github")]
	Octocrab(#[from] octocrab::Error),
	#[error("Timeout sending request to GitHub API")]
	Timeout,
}
