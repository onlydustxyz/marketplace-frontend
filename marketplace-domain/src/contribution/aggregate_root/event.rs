use std::fmt::Display;

use crate::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Created {
		id: ContributionId,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		gate: u8,
	},
	Applied {
		id: ContributionId,
		contributor_id: ContributorId,
	},
	Assigned {
		id: ContributionId,
		contributor_id: ContributorId,
	},
	Claimed {
		id: ContributionId,
		contributor_id: ContributorId,
	},
	Unassigned {
		id: ContributionId,
	},
	Validated {
		id: ContributionId,
	},
}

impl Display for Event {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(&self).map_err(|_| std::fmt::Error)?
		)
	}
}
