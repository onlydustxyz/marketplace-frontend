use domain::{github_service_filters::State, GithubServiceFilters};
use octocrab::models::pulls::PullRequest;

use super::{Decision, Filter};

impl Filter for Result<PullRequest, octocrab::Error> {
	fn filter(self, filters: &GithubServiceFilters) -> Decision<Self> {
		if (filters.state == Some(State::Merged) || filters.merged_since.is_some())
			&& self.as_ref().ok().map(|pr| pr.merged_at.is_none()).unwrap_or(false)
		{
			return Decision::Skip;
		}

		if let Some(merged_since) = filters.merged_since {
			if self
				.as_ref()
				.map(|pr| pr.merged_at)
				.map(|merged_at| {
					merged_at.map(|merged_at| merged_at < merged_since).unwrap_or(false)
				})
				.unwrap_or(true)
			{
				return Decision::End;
			}
		}

		Decision::Take(self)
	}
}
