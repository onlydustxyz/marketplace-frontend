use crate::domain::*;

pub trait Service: Send + Sync {
	fn create(&self, contribution: Contribution) -> AnyResult<()>;
	fn assign_contributor(
		&self,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> AnyResult<()>;
	fn unassign_contributor(&self, contribution_id: ContributionId) -> AnyResult<()>;
	fn validate(&self, contribution_id: ContributionId) -> AnyResult<()>;
}
