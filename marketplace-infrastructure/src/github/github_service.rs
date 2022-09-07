use super::{extract_metadata, Client, OctocrabIssue};
use anyhow::anyhow;
use async_trait::async_trait;
use mapinto::ResultMapInto;
use marketplace_domain::{
	GithubClient, GithubClientError, GithubIssue, GithubIssueNumber, GithubProjectId, GithubRepo,
};

#[async_trait]
impl GithubClient for Client {
	async fn find_repository_by_id(
		&self,
		project_id: &GithubProjectId,
	) -> Result<GithubRepo, GithubClientError> {
		let repository = self
			.repository_by_id(project_id.to_owned())
			.await
			.map_err(|e| GithubClientError::Infrastructure(anyhow!(e)))?;

		Ok(GithubRepo {
			project_id: repository.id.0,
			owner: repository.owner.map(|user| user.login).unwrap_or_default(),
			name: repository.name,
		})
	}

	async fn find_issue_by_id(
		&self,
		project_id: &GithubProjectId,
		issue_number: &GithubIssueNumber,
	) -> Result<GithubIssue, GithubClientError> {
		// Safe to cast, as long as there is no more than i64::Max (9_223_372_036_854_775_807)
		// issues on the repository.
		self.issue(project_id.to_owned(), *issue_number as i64)
			.await
			.map_err(|e| GithubClientError::Infrastructure(anyhow!(e)))
			.map_into()
	}
}

impl From<OctocrabIssue> for GithubIssue {
	fn from(issue: OctocrabIssue) -> Self {
		let metadata = extract_metadata(&issue.issue);

		Self {
			// Safe to unwrap because, despite being of type i64,
			// github issue numbers are always positive numbers
			number: issue.issue.number.try_into().unwrap(),
			project_id: issue.project_id,
			title: issue.issue.title,
			description: issue.issue.body,
			external_link: issue.issue.html_url,
			difficulty: metadata.difficulty,
			technology: metadata.technology,
			duration: metadata.duration,
			context: metadata.context,
			r#type: metadata.r#type,
		}
	}
}
