use std::fmt::Display;

use crate::*;

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Action {
	CreateContribution {
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		gate: u8,
	},
	AssignContributor {
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	},
	UnassignContributor {
		contribution_id: ContributionId,
	},
	ValidateContribution {
		contribution_id: ContributionId,
	},
}

impl Display for Action {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			match self {
				Action::CreateContribution {
					project_id,
					issue_number,
					gate,
				} => format!(
					"Create contribution for issue {issue_number} of project {project_id} with gate {gate}."
				),
				Action::AssignContributor {
					contribution_id,
					contributor_id,
				} => format!(
					"Assign contributor {contributor_id} to contribution {contribution_id}."
				),
				Action::UnassignContributor { contribution_id } =>
					format!("Unassign contributor from contribution {contribution_id}."),
				Action::ValidateContribution { contribution_id } =>
					format!("Validate contribution {contribution_id}."),
			}
		)
	}
}
