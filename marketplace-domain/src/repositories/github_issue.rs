use crate::{GithubIssue, GithubIssueNumber, GithubProjectId};
use async_trait::async_trait;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happened at infrastructure level: {0}")]
	Infrastructure(String),
}

#[async_trait]
pub trait Repository {
	async fn find(
		&self,
		project_id: &GithubProjectId,
		issue_number: &GithubIssueNumber,
	) -> Result<Option<GithubIssue>, Error>;
}
