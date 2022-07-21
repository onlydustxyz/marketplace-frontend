use crate::domain::*;

pub trait Service {
	fn create(&self, contribution: Contribution) -> Result<()>;
	fn assign_contributor(
		&self,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Result<()>;
	fn unassign_contributor(&self, contribution_id: ContributionId) -> Result<()>;
	fn validate(&self, contribution_id: ContributionId) -> Result<()>;
}
