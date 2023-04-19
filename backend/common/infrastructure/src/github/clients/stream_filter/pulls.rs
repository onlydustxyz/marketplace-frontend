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

#[cfg(test)]
mod tests {
	use rstest::*;

	use super::*;

	#[fixture]
	fn pull_request() -> PullRequest {
		serde_json::from_str(
			r#"{
				"id": 1318171172,
				"number": 889,
				"head": {
					"ref": "develop",
					"sha": "82ac6ba2dcb537fe9abdc12766b648da9483c674"
				},
				"base": {
					"ref": "develop",
					"sha": "82ac6ba2dcb537fe9abdc12766b648da9483c674"
				},
				"created_at": "2023-04-18T13:15:05Z",
				"url": "https://api.github.com/repos/onlydustxyz/marketplace/pulls/889"
			}"#,
		)
		.unwrap()
	}

	#[fixture]
	fn merged_pull_request() -> PullRequest {
		serde_json::from_str(
			r#"{
				"id": 1318171172,
				"number": 889,
				"head": {
					"ref": "develop",
					"sha": "82ac6ba2dcb537fe9abdc12766b648da9483c674"
				},
				"base": {
					"ref": "develop",
					"sha": "82ac6ba2dcb537fe9abdc12766b648da9483c674"
				},
				"created_at": "2023-04-18T13:15:05Z",
				"merged_at": "2023-04-18T14:15:05Z",
				"url": "https://api.github.com/repos/onlydustxyz/marketplace/pulls/889"
			}"#,
		)
		.unwrap()
	}

	#[rstest]
	fn filter_by_created_since(pull_request: PullRequest) {
		let filters = GithubServiceFilters::new(None, "2023-03-10T10:00:00Z".parse().ok());

		assert_eq!(
			pull_request.clone().filter(&filters),
			Decision::Take(pull_request)
		);
	}

	#[rstest]
	fn filter_by_created_since_on_exact_date(pull_request: PullRequest) {
		let filters = GithubServiceFilters::new(None, "2023-04-18T13:15:05Z".parse().ok());

		assert_eq!(
			pull_request.clone().filter(&filters),
			Decision::Take(pull_request)
		);
	}

	#[rstest]
	fn filter_by_state_merged(#[from(merged_pull_request)] pull_request: PullRequest) {
		let filters = GithubServiceFilters::new(Some(State::Merged), None);

		assert_eq!(
			pull_request.clone().filter(&filters),
			Decision::Take(pull_request)
		);
	}

	#[rstest]
	fn skip_pull(pull_request: PullRequest) {
		let filters =
			GithubServiceFilters::new(Some(State::Merged), "2023-04-18T13:15:05Z".parse().ok());

		assert_eq!(pull_request.filter(&filters), Decision::Skip);
	}

	#[rstest]
	fn end_stream_if_pull_created_before(pull_request: PullRequest) {
		let filters =
			GithubServiceFilters::new(Some(State::Merged), "2023-05-18T13:15:05Z".parse().ok());

		assert_eq!(pull_request.filter(&filters), Decision::End);
	}
}
