use std::fmt::Display;

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

impl Display for Action {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", serde_json::to_string(self).unwrap_or_default())
	}
}
