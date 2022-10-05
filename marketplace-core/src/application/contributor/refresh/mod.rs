use crate::application::refresh::Refresh;
use marketplace_domain::*;

pub type RefreshContributors = Refresh<ContributorProfile>;

#[cfg(test)]
mod test;
