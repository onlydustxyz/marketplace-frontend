use domain::{github_service_filters::State, GithubServiceFilters};
use octocrab::models::pulls::PullRequest;

use super::{Decision, Filter};

impl Filter for PullRequest {
	fn filter(self, filters: &GithubServiceFilters) -> Decision<Self> {
		if let Some(created_since) = filters.created_since {
			if self.created_at.map(|created_at| created_at < created_since).unwrap_or(false) {
				// Found a pr created before `created_since`,
				// assuming stream is ordered, we can end here
				return Decision::End;
			}
		}

		if (filters.state == Some(State::Merged)) && self.merged_at.is_none() {
			// Skipping non merged items if filter state is `Merged`
			return Decision::Skip;
		}

		Decision::Take(self)
	}
}
