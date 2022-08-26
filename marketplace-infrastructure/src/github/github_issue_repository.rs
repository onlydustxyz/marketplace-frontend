use super::{extract_metadata, Client, OctocrabIssue};
use async_trait::async_trait;
use marketplace_domain::{
	GithubIssue, GithubIssueNumber, GithubIssueRepository, GithubIssueRepositoryError,
	GithubProjectId,
};

#[async_trait]
impl GithubIssueRepository for Client {
	async fn find(
		&self,
		project_id: &GithubProjectId,
		issue_number: &GithubIssueNumber,
	) -> Result<Option<GithubIssue>, GithubIssueRepositoryError> {
		self.issue(project_id.to_owned(), issue_number.to_owned())
			.await
			.map_err(|e| GithubIssueRepositoryError::Infrastructure(e.to_string()))
			.map(|issue| Some(issue.into()))
	}
}

impl From<OctocrabIssue> for GithubIssue {
	fn from(issue: OctocrabIssue) -> Self {
		let metadata = extract_metadata(&issue.issue);

		Self {
			number: issue.issue.number,
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
