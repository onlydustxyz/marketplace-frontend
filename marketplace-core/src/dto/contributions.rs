use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, JsonSchema)]
pub struct ContributionCreation {
	github_issue_number: i64,
	project_id: i64,
	gate: u8,
}

impl ContributionCreation {
	pub fn new(github_issue_number: i64, project_id: i64, gate: u8) -> Self {
		Self {
			github_issue_number,
			project_id,
			gate,
		}
	}

	pub fn github_issue_number(&self) -> i64 {
		self.github_issue_number
	}

	pub fn project_id(&self) -> i64 {
		self.project_id
	}

	pub fn gate(&self) -> u8 {
		self.gate
	}
}
