use std::fmt::Display;

use crate::*;
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Deployed {
		contract_address: ContractAddress,
	},
	Created {
		id: ContributionId,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		gate: u8,
	},
	Applied {
		id: ContributionId,
		contributor_id: ContributorAccountAddress,
		applied_at: NaiveDateTime,
	},
	ApplicationRefused {
		id: ContributionId,
		contributor_id: ContributorAccountAddress,
	},
	Assigned {
		id: ContributionId,
		contributor_id: ContributorAccountAddress,
	},
	Claimed {
		id: ContributionId,
		contributor_id: ContributorAccountAddress,
	},
	Unassigned {
		id: ContributionId,
	},
	Validated {
		id: ContributionId,
	},
	GateChanged {
		id: ContributionId,
		gate: u8,
	},
	Deleted {
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

impl From<Event> for crate::Event {
	fn from(event: Event) -> Self {
		crate::Event::Contribution(event)
	}
}
