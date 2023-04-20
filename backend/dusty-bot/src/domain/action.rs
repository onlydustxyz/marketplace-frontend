use domain::{GithubIssueNumber, MessagePayload};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum Action {
	CreateComment {
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
		body: String,
	},
	CloseIssue {
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	},
}

impl MessagePayload for Action {}
