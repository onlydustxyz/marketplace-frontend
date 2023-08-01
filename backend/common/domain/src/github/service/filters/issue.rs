use chrono::{DateTime, Utc};

use crate::{stream_filter, GithubIssue};

#[derive(Debug, Default, Clone, Copy)]
pub struct Filters {
	pub updated_since: Option<DateTime<Utc>>,
}

impl stream_filter::Filter for Filters {
	type I = GithubIssue;

	fn filter(&self, item: GithubIssue) -> stream_filter::Decision<GithubIssue> {
		if let Some(updated_since) = self.updated_since {
			if item.updated_at < updated_since {
				// Found an issue updated before `updated_since`,
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
	use crate::{stream_filter::Filter, GithubIssueStatus, GithubUser};

	#[fixture]
	fn issue() -> GithubIssue {
		GithubIssue {
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
			status: GithubIssueStatus::Open,
			created_at: DateTime::parse_from_rfc3339("2023-04-18T13:15:05Z")
				.unwrap()
				.with_timezone(&Utc),
			updated_at: DateTime::parse_from_rfc3339("2023-04-18T13:15:05Z")
				.unwrap()
				.with_timezone(&Utc),
			closed_at: None,
			assignees: vec![],
			comments_count: 0,
		}
	}

	#[rstest]
	fn filter_by_updated_since(issue: GithubIssue) {
		let filters = Filters {
			updated_since: "2023-03-10T10:00:00Z".parse().ok(),
		};

		assert_eq!(
			filters.filter(issue.clone()),
			stream_filter::Decision::Take(issue)
		);
	}

	#[rstest]
	fn filter_by_updated_since_on_exact_date(issue: GithubIssue) {
		let filters = Filters {
			updated_since: "2023-04-18T13:15:05Z".parse().ok(),
		};

		assert_eq!(
			filters.filter(issue.clone()),
			stream_filter::Decision::Take(issue)
		);
	}

	#[rstest]
	fn end_stream_if_updated_before(issue: GithubIssue) {
		let filters = Filters {
			updated_since: "2023-05-18T13:15:05Z".parse().ok(),
		};

		assert_eq!(filters.filter(issue), stream_filter::Decision::End);
	}
}
