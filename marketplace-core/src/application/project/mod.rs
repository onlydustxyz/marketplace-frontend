use crate::application::refresh::Refresh;
use marketplace_domain::*;

pub type RefreshProjectsMembers = Refresh<ProjectProjection, ProjectAggregate>;
