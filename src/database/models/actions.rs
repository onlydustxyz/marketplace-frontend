use serde::{Deserialize, Serialize};

use crate::domain::{ContributionId, ContributorId, ProjectId};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AddContribution {
    contribution_id: ContributionId,
    project_id: ProjectId,
    gate: u8,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AssignContributor {
    contribution_id: ContributionId,
    contributor_id: ContributorId,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct UnassignContributor {
    contribution_id: ContributionId,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct ValidateContribution {
    contribution_id: ContributionId,
}
