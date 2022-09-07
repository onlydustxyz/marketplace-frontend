use serde::{Deserialize, Serialize};
use std::fmt::Display;

use crate::{ContributorId, ProjectId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	MemberAdded {
		project_id: ProjectId,
		contributor_id: ContributorId,
	},
	MemberRemoved {
		project_id: ProjectId,
		contributor_id: ContributorId,
	},
	LeadContributorAdded {
		project_id: ProjectId,
		contributor_id: ContributorId,
	},
	LeadContributorRemoved {
		project_id: ProjectId,
		contributor_id: ContributorId,
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
