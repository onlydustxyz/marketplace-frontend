use crate::domain::*;

pub trait Repository {
    fn store(&self, contribution: Contribution, transaction_hash: String) -> Result<()>;

    fn update_contributor_and_status(
        &self,
        contribution_id: ContributionId,
        contributor_id: Option<ContributorId>,
        status: ContributionStatus,
        transaction_hash: String,
    ) -> Result<()>;

    fn update_status(
        &self,
        contribution_id: ContributionId,
        status: ContributionStatus,
        transaction_hash: String,
    ) -> Result<()>;
}
