use crate::application::refresh::Refresh;
use marketplace_domain::*;

pub type RefreshContributors = Refresh<ContributorProjection>;

#[cfg(test)]
mod test;
