use crate::application::refresh::Refresh;
use marketplace_domain::*;

pub type RefreshContributors = Refresh<ContributorDetails>;

#[cfg(test)]
mod test;
