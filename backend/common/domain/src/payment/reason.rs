use derive_getters::Getters;
use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

use crate::{GithubIssueNumber, GithubRepositoryId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, GraphQLInputObject, Getters)]
pub struct WorkItem {
	repo_id: GithubRepositoryId,
	issue_number: GithubIssueNumber,
}

#[derive(
	Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize, GraphQLInputObject, Getters,
)]
pub struct Reason {
	work_items: Vec<WorkItem>,
}
