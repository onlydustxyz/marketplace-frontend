use domain::GithubServiceIssueFilters;
use octocrab::models::issues::Issue;

use super::{Decision, Filter};

impl Filter<GithubServiceIssueFilters> for Issue {
	fn filter(self, filters: &GithubServiceIssueFilters) -> Decision<Self> {
		if let Some(created_since) = filters.created_since {
			if self.created_at < created_since {
				// Found a pr created before `created_since`,
				// assuming stream is ordered, we can end here
				return Decision::End;
			}
		}

		if let Some(updated_since) = filters.updated_since {
			if self.updated_at < updated_since {
				// Found a pr updated before `updated_since`,
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
	fn issue() -> Issue {
		serde_json::from_str(
			r#"{
				"url": "https://api.github.com/repos/onlydustxyz/marketplace/issues/17",
				"repository_url": "https://api.github.com/repos/onlydustxyz/marketplace",
				"labels_url": "https://api.github.com/repos/onlydustxyz/marketplace/issues/17/labels{/name}",
				"comments_url": "https://api.github.com/repos/onlydustxyz/marketplace/issues/17/comments",
				"events_url": "https://api.github.com/repos/onlydustxyz/marketplace/issues/17/events",
				"html_url": "https://github.com/onlydustxyz/marketplace/issues/17",
				"id": 1278125016,
				"node_id": "I_kwDOHbl-LM5MLqPY",
				"number": 17,
				"title": "create daemon to watch and index repositories",
				"created_at": "2023-04-18T13:15:05Z",
				"updated_at": "2023-04-18T13:15:05Z",
				"state": "closed",
				"locked": false,
				"user": {
					"login": "AnthonyBuisset",
					"id": 43467246,
					"node_id": "MDQ6VXNlcjQzNDY3MjQ2",
					"avatar_url": "https://avatars.githubusercontent.com/u/43467246?v=4",
					"gravatar_id": "",
					"url": "https://api.github.com/users/AnthonyBuisset",
					"html_url": "https://github.com/AnthonyBuisset",
					"followers_url": "https://api.github.com/users/AnthonyBuisset/followers",
					"following_url": "https://api.github.com/users/AnthonyBuisset/following{/other_user}",
					"gists_url": "https://api.github.com/users/AnthonyBuisset/gists{/gist_id}",
					"starred_url": "https://api.github.com/users/AnthonyBuisset/starred{/owner}{/repo}",
					"subscriptions_url": "https://api.github.com/users/AnthonyBuisset/subscriptions",
					"organizations_url": "https://api.github.com/users/AnthonyBuisset/orgs",
					"repos_url": "https://api.github.com/users/AnthonyBuisset/repos",
					"events_url": "https://api.github.com/users/AnthonyBuisset/events{/privacy}",
					"received_events_url": "https://api.github.com/users/AnthonyBuisset/received_events",
					"type": "User",
					"site_admin": false
				  },
				  "labels": [],
				  "author_association": "CONTRIBUTOR",
				  "comments": 0,
				  "assignees": []
			}"#,
		)
		.unwrap()
	}

	#[rstest]
	fn filter_by_created_since(issue: Issue) {
		let filters = GithubServiceIssueFilters {
			created_since: "2023-03-10T10:00:00Z".parse().ok(),
			..Default::default()
		};

		assert_eq!(issue.clone().filter(&filters), Decision::Take(issue));
	}

	#[rstest]
	fn filter_by_created_since_on_exact_date(issue: Issue) {
		let filters = GithubServiceIssueFilters {
			created_since: "2023-04-18T13:15:05Z".parse().ok(),
			..Default::default()
		};

		assert_eq!(issue.clone().filter(&filters), Decision::Take(issue));
	}

	#[rstest]
	fn end_stream_if_created_before(issue: Issue) {
		let filters = GithubServiceIssueFilters {
			created_since: "2023-05-18T13:15:05Z".parse().ok(),
			..Default::default()
		};

		assert_eq!(issue.filter(&filters), Decision::End);
	}
}
