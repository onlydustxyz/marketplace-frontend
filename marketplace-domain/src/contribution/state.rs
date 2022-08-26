use crate::*;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct State {
	pub project_id: GithubProjectId,
	pub issue_number: GithubIssueNumber,
	pub gate: u8,
	pub contributor_id: Option<ContributorId>,
	pub validator: ContractAddress,
	pub status: ContributionStatus,
}
