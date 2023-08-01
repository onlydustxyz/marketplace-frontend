use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

use crate::{GithubIssueNumber, GithubRepoId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, GraphQLInputObject)]
pub struct WorkItem {
	pub repo_id: GithubRepoId,
	pub issue_number: GithubIssueNumber,
}

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize, GraphQLInputObject)]
pub struct Reason {
	pub work_items: Vec<WorkItem>,
}
