use crate::application::refresh::Refresh;
use marketplace_domain::*;

pub type RefreshContributions = Refresh<ContributionProjection>;
pub type RefreshApplications = Refresh<ApplicationProjection>;
pub type RefreshProjects = Refresh<ProjectProjection>;
pub type RefreshContributors = Refresh<ContributorProjection>;

#[cfg(test)]
mod tests;
