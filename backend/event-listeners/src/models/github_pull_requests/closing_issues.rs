use diesel::Identifiable;
use domain::{GithubIssueId, GithubPullRequestId};
use infrastructure::database::schema::closing_issues;
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Clone,
	Insertable,
	Identifiable,
	Queryable,
	Serialize,
	Deserialize,
	ImmutableModel,
	PartialEq,
)]
#[diesel(primary_key(github_issue_id, github_pull_request_id))]
pub struct ClosingIssue {
	pub github_issue_id: GithubIssueId,
	pub github_pull_request_id: GithubPullRequestId,
}

impl Identifiable for ClosingIssue {
	type Id = (GithubIssueId, GithubPullRequestId);

	fn id(self) -> Self::Id {
		(self.github_issue_id, self.github_pull_request_id)
	}
}
