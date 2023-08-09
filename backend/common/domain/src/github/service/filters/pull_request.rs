use chrono::{DateTime, Utc};

use crate::{stream_filter, GithubPullRequest};

#[derive(Debug, Default, Clone, Copy)]
pub struct Filters {
	pub updated_since: Option<DateTime<Utc>>,
}

impl stream_filter::Filter for Filters {
	type I = GithubPullRequest;

	fn filter(&self, item: GithubPullRequest) -> stream_filter::Decision<GithubPullRequest> {
		if let Some(updated_since) = self.updated_since {
			if item.updated_at < updated_since {
				// Found a pr updated before `updated_since`,
				// assuming stream is ordered, we can end here
				return stream_filter::Decision::End;
			}
		}

		stream_filter::Decision::Take(item)
	}
}

#[cfg(test)]
mod tests {
	use rstest::*;
	use url::Url;

	use super::*;
	use crate::{stream_filter::Filter, *};

	#[fixture]
	fn repo() -> GithubRepo {
		GithubRepo {
			id: 43214u64.into(),
			owner: String::from("onlydustxyz"),
			name: String::from("marketplace"),
			logo_url: "https://onlydust.xyz".parse().unwrap(),
			html_url: "https://onlydust.xyz".parse().unwrap(),
			description: Default::default(),
			stars: Default::default(),
			forks_count: Default::default(),
			parent: Default::default(),
		}
	}

	#[fixture]
	fn pull_request(
		#[from(repo)] base_repo: GithubRepo,
		#[from(repo)] head_repo: GithubRepo,
	) -> GithubPullRequest {
		GithubPullRequest {
			id: 1278125016u64.into(),
			repo_id: 43214u64.into(),
			number: 17i64.into(),
			title: "Super issue".to_string(),
			author: GithubUser {
				id: 666u64.into(),
				login: "foooooo".to_string(),
				avatar_url: Url::parse("https://github.com/aaa").unwrap(),
				html_url: Url::parse("https://github.com/bbb").unwrap(),
			},
			html_url: Url::parse("https://github.com/onlydustxyz/marketplace/issues/17").unwrap(),
			status: GithubPullRequestStatus::Open,
			created_at: DateTime::parse_from_rfc3339("2023-04-18T13:15:05Z")
				.unwrap()
				.with_timezone(&Utc),
			updated_at: DateTime::parse_from_rfc3339("2023-04-18T13:15:05Z")
				.unwrap()
				.with_timezone(&Utc),
			closed_at: Default::default(),
			merged_at: Default::default(),
			draft: Default::default(),
			head_sha: Default::default(),
			head_repo,
			base_sha: Default::default(),
			base_repo,
		}
	}

	#[rstest]
	fn filter_by_updated_since(pull_request: GithubPullRequest) {
		let filters = Filters {
			updated_since: "2023-03-10T10:00:00Z".parse().ok(),
		};

		assert_eq!(
			filters.filter(pull_request.clone()),
			stream_filter::Decision::Take(pull_request)
		);
	}

	#[rstest]
	fn filter_by_updated_since_on_exact_date(pull_request: GithubPullRequest) {
		let filters = Filters {
			updated_since: "2023-04-18T13:15:05Z".parse().ok(),
		};

		assert_eq!(
			filters.filter(pull_request.clone()),
			stream_filter::Decision::Take(pull_request)
		);
	}

	#[rstest]
	fn end_stream_if_updated_before(pull_request: GithubPullRequest) {
		let filters = Filters {
			updated_since: "2023-05-18T13:15:05Z".parse().ok(),
		};

		assert_eq!(filters.filter(pull_request), stream_filter::Decision::End);
	}
}
