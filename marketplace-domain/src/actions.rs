use crate::*;

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Action {
	CreateContribution {
		github_composite: String,
		project_id: ProjectId,
		gate: u8,
	},
	AssignContributor {
		contribution_id: ContributionOnChainId,
		contributor_id: ContributorId,
	},
	UnassignContributor {
		contribution_id: ContributionOnChainId,
	},
	ValidateContribution {
		contribution_id: ContributionOnChainId,
	},
}
