use crate::application::refresh::Refresh;
use marketplace_domain::*;

pub type RefreshContributions = Refresh<GithubContribution>;
pub type RefreshApplications = Refresh<ApplicationProjection>;
pub type RefreshProjects = Refresh<ProjectProjection>;
