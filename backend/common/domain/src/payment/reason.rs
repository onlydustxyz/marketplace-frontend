use serde::{Deserialize, Serialize};

use crate::{GithubIssueNumber, GithubPullRequestNumber, GithubRepoId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum WorkItem {
	Issue {
		repo_id: GithubRepoId,
		number: GithubIssueNumber,
	},
	PullRequest {
		repo_id: GithubRepoId,
		number: GithubPullRequestNumber,
	},
	CodeReview {
		repo_id: GithubRepoId,
		number: GithubPullRequestNumber,
	},
}

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Reason {
	pub work_items: Vec<WorkItem>,
}
