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
