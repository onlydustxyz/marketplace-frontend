use crate::application::refresh::Refresh;
use marketplace_domain::*;

pub type RefreshContributions = Refresh<ContributionProjection, Contribution>;
pub type RefreshApplications = Refresh<ApplicationProjection, Contribution>;
pub type RefreshProjects = Refresh<ProjectProjection, Contribution>;

#[cfg(test)]
mod test;
