use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, JsonSchema)]
pub struct ContributionCreation {
	github_issue_number: u64,
	project_id: u64,
	gate: u8,
}

impl ContributionCreation {
	pub fn new(github_issue_number: u64, project_id: u64, gate: u8) -> Self {
		Self {
			github_issue_number,
			project_id,
			gate,
		}
	}

	pub fn github_issue_number(&self) -> u64 {
		self.github_issue_number
	}

	pub fn project_id(&self) -> u64 {
		self.project_id
	}

	pub fn gate(&self) -> u8 {
		self.gate
	}
}
