use diesel::Identifiable;
use domain::{GithubIssueNumber, GithubRepoId, ProjectId};
use infrastructure::database::schema::ignored_github_issues;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, Serialize, Deserialize, Queryable, Identifiable, ImmutableModel,
)]
#[diesel(primary_key(project_id, repo_id, issue_number))]
pub struct IgnoredGithubIssue {
	pub project_id: ProjectId,
	pub repo_id: GithubRepoId,
	pub issue_number: GithubIssueNumber,
}

impl Identifiable for IgnoredGithubIssue {
	type Id = (ProjectId, GithubRepoId, GithubIssueNumber);

	fn id(self) -> Self::Id {
		(self.project_id, self.repo_id, self.issue_number)
	}
}
