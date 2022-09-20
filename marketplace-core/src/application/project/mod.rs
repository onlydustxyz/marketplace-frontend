use crate::application::refresh::Refresh;
use marketplace_domain::*;

pub type RefreshProjectsMembers = Refresh<ProjectMemberProjection>;
pub type RefreshLeadContributors = Refresh<LeadContributorProjection>;

#[cfg(test)]
mod test;
