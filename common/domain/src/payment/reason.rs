use serde::{Deserialize, Serialize};

use crate::{
	GithubCodeReviewId, GithubIssueId, GithubIssueNumber, GithubPullRequestId,
	GithubPullRequestNumber, GithubRepoId,
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
		id: GithubCodeReviewId,
		repo_id: GithubRepoId,
		number: GithubPullRequestNumber,
	},
}

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Reason {
	pub work_items: Vec<WorkItem>,
}
