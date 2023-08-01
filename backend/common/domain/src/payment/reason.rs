use serde::{Deserialize, Serialize};

use crate::{GithubIssueNumber, GithubRepoId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct WorkItem {
	pub repo_id: GithubRepoId,
	pub issue_number: GithubIssueNumber,
}

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Reason {
	pub work_items: Vec<WorkItem>,
}
