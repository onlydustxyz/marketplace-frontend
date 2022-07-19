use crate::domain::{Contribution, ContributionId, ContributorId};

#[derive(Clone, Debug)]
pub enum Action {
    CreateContribution {
        contribution: Contribution,
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
