use domain::{GithubIssueNumber, MessagePayload};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum Action {
	CloseIssue {
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	},
}

impl MessagePayload for Action {}
