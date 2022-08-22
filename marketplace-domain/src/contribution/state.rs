use crate::*;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct State {
	pub project_id: ProjectId,
	pub github_issue_number: u32,
	pub gate: u8,
	pub contributor_id: Option<ContributorId>,
	pub validator: ContractAddress,
	pub status: ContributionStatus,
}
