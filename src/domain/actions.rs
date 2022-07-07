use serde::{Deserialize, Serialize};

use crate::domain::{ContributionId, ContributorId, ProjectId};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub enum Action {
    AddContribution {
        contribution_id: ContributionId,
        project_id: ProjectId,
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
