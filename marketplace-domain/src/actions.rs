use crate::*;

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Action {
	CreateContribution {
		github_composite: String,
		project_id: ProjectId,
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
