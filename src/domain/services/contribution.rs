use crate::domain::*;
use mockall::automock;

#[automock]
pub trait Service: Send + Sync {
	fn create(&self, contribution: Contribution) -> AnyResult<()>;
	fn assign_contributor(
		&self,
		contribution_id: ContributionOnChainId,
		contributor_id: ContributorId,
	) -> AnyResult<()>;
	fn unassign_contributor(&self, contribution_id: ContributionOnChainId) -> AnyResult<()>;
	fn validate(&self, contribution_id: ContributionOnChainId) -> AnyResult<()>;
}
