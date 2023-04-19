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

#[cfg(test)]
mod tests {
	use rstest::*;

	use super::*;

	#[fixture]
	fn event() -> Event {
		serde_json::from_str(
			r#"{
				"id": "28494625552",
				"type": "IssueCommentEvent",
				"actor": {
					"id": 595505,
					"login": "ofux",
					"display_login": "ofux",
					"gravatar_id": "",
					"url": "https://api.github.com/users/ofux",
					"avatar_url": "https://avatars.githubusercontent.com/u/595505?"
				},
				"repo": {
					"id": 498695724,
					"name": "onlydustxyz/marketplace",
					"url": "https://api.github.com/repos/onlydustxyz/marketplace"
				},
				"public": true,
				"created_at": "2023-04-18T13:15:05Z"
			}"#,
		)
		.unwrap()
	}

	#[rstest]
	fn filter_by_created_since(event: Event) {
		let filters = GithubServiceFilters::new(None, "2023-03-18T13:15:05Z".parse().ok());

		assert_eq!(event.clone().filter(&filters), Decision::Take(event));
	}

	#[rstest]
	fn filter_by_created_since_on_exact_date(event: Event) {
		let filters = GithubServiceFilters::new(None, "2023-04-18T13:15:05Z".parse().ok());

		assert_eq!(event.filter(&filters), Decision::End);
	}

	#[rstest]
	fn end_stream_if_pull_created_before(event: Event) {
		let filters = GithubServiceFilters::new(None, "2023-04-18T13:15:05Z".parse().ok());

		assert_eq!(event.filter(&filters), Decision::End);
	}
}
