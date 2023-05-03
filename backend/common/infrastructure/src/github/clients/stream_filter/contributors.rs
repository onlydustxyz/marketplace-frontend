use domain::{GithubRepoContributor, GithubUserId, NotInFilters};

use super::{Decision, Filter};

impl Filter<NotInFilters<GithubUserId>> for GithubRepoContributor {
	fn filter(self, filters: &NotInFilters<GithubUserId>) -> super::Decision<Self> {
		if filters.values.contains(self.id()) {
			Decision::Skip
		} else {
			Decision::Take(self)
		}
	}
}
