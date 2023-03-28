use std::sync::Arc;

use anyhow::anyhow;
use domain::{DomainError, GithubIssue};
use tracing::instrument;

use crate::domain::GithubService;

pub struct Usecase {
	github_service: Arc<dyn GithubService>,
}

impl Usecase {
	pub fn new(github_service: Arc<dyn GithubService>) -> Self {
		Self { github_service }
	}

	#[instrument(skip(self))]
	pub async fn create_issue(
		&self,
		repo_owner: String,
		repo_name: String,
		title: String,
		description: String,
		assignees: Vec<String>,
	) -> Result<GithubIssue, DomainError> {
		self.github_service
			.create_issue(&repo_owner, &repo_name, &title, &description, assignees)
			.await
			.map_err(|e| match e {
				crate::domain::GithubServiceError::Other(_) =>
					DomainError::InvalidInputs(anyhow!(e)),
				_ => DomainError::InternalError(anyhow!(e)),
			})
	}
}
