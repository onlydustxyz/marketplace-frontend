use domain::GithubServiceFilters;
use octocrab::models::events::Event;

use super::{Decision, Filter};

impl Filter for Event {
	fn filter(self, filters: &GithubServiceFilters) -> Decision<Self> {
		if let Some(created_since) = filters.created_since {
			if self.created_at <= created_since {
				// Found an event created before `created_since`,
				// assuming stream is ordered, we can end here
				return Decision::End;
			}
		}

		Decision::Take(self)
	}
}
