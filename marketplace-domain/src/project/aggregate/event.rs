use serde::{Deserialize, Serialize};
use std::fmt::Display;

use crate::{ContributorAccountAddress, ProjectId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	MemberAdded {
		project_id: ProjectId,
		contributor_account: ContributorAccountAddress,
	},
	MemberRemoved {
		project_id: ProjectId,
		contributor_account: ContributorAccountAddress,
	},
	LeadContributorAdded {
		project_id: ProjectId,
		contributor_account: ContributorAccountAddress,
	},
	LeadContributorRemoved {
		project_id: ProjectId,
		contributor_account: ContributorAccountAddress,
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
