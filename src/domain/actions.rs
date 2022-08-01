use crate::domain::*;

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Action {
	CreateContribution {
		contribution: Contribution,
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
