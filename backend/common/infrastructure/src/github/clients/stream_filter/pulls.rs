use domain::{github_service_filters::State, GithubServiceFilters};
use octocrab::models::pulls::PullRequest;

use super::{Decision, Filter};

impl Filter for PullRequest {
	fn filter(self, filters: &GithubServiceFilters) -> Decision<Self> {
		if (filters.state == Some(State::Merged) || filters.merged_since.is_some())
			&& self.merged_at.is_none()
		{
			// Skipping non merged items if filter state is `Merged` or `merge_since`
			return Decision::Skip;
		}

		if let Some(merged_since) = filters.merged_since {
			// Safe to unwrap as checked above
			if self.merged_at.unwrap() < merged_since {
				// Found a pr merged before `merged_since`,
				// assuming stream is ordered, we can end here
				return Decision::End;
			}
		}

		Decision::Take(self)
	}
}
