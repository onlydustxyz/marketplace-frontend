use serde::{Deserialize, Serialize};

use crate::{
	GithubIssueId, GithubIssueNumber, GithubPullRequestId, GithubPullRequestNumber, GithubRepoId,
	GithubUserId,
};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum WorkItem {
	Issue {
		id: GithubIssueId,
		repo_id: GithubRepoId,
		number: GithubIssueNumber,
	},
	PullRequest {
		id: GithubPullRequestId,
		repo_id: GithubRepoId,
		number: GithubPullRequestNumber,
	},
	CodeReview {
		id: GithubPullRequestId,
		repo_id: GithubRepoId,
		number: GithubPullRequestNumber,
		reviewer_id: GithubUserId,
	},
}

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Reason {
	pub work_items: Vec<WorkItem>,
}
