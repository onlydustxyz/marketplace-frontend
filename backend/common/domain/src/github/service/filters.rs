use chrono::{DateTime, Utc};
use juniper::{GraphQLEnum, GraphQLInputObject};

use crate::{stream_filter, GithubIssue};

#[derive(Debug, Default, Clone, Copy, GraphQLInputObject)]
pub struct IssueFilters {
	pub state: Option<IssueState>,
	pub created_since: Option<DateTime<Utc>>,
	pub updated_since: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Copy, GraphQLEnum, PartialEq, Eq)]
pub enum IssueState {
	Open,
	Closed,
	All,
}

impl stream_filter::Filter for IssueFilters {
	type I = GithubIssue;

	fn filter(&self, item: GithubIssue) -> stream_filter::Decision<GithubIssue> {
		if let Some(created_since) = self.created_since {
			if *item.created_at() < created_since {
				// Found a pr created before `created_since`,
				// assuming stream is ordered, we can end here
				return stream_filter::Decision::End;
			}
		}

		if let Some(updated_since) = self.updated_since {
			if *item.updated_at() < updated_since {
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
	fn issue() -> GithubIssue {
		GithubIssue::new(
			1278125016u64.into(),
			43214u64.into(),
			17,
			GithubIssueType::Issue,
			"Super issue".to_string(),
			GithubUser::new(
				666u64.into(),
				"foooooo".to_string(),
				Url::parse("https://github.com/aaa").unwrap(),
				Url::parse("https://github.com/bbb").unwrap(),
			),
			Url::parse("https://github.com/onlydustxyz/marketplace/issues/17").unwrap(),
			GithubIssueStatus::Open,
			DateTime::parse_from_rfc3339("2023-04-18T13:15:05Z")
				.unwrap()
				.with_timezone(&Utc),
			DateTime::parse_from_rfc3339("2023-04-18T13:15:05Z")
				.unwrap()
				.with_timezone(&Utc),
			None,
			None,
		)
	}

	#[rstest]
	fn filter_by_created_since(issue: GithubIssue) {
		let filters = GithubServiceIssueFilters {
			created_since: "2023-03-10T10:00:00Z".parse().ok(),
			..Default::default()
		};

		assert_eq!(
			filters.filter(issue.clone()),
			stream_filter::Decision::Take(issue)
		);
	}

	#[rstest]
	fn filter_by_created_since_on_exact_date(issue: GithubIssue) {
		let filters = GithubServiceIssueFilters {
			created_since: "2023-04-18T13:15:05Z".parse().ok(),
			..Default::default()
		};

		assert_eq!(
			filters.filter(issue.clone()),
			stream_filter::Decision::Take(issue)
		);
	}

	#[rstest]
	fn end_stream_if_created_before(issue: GithubIssue) {
		let filters = GithubServiceIssueFilters {
			created_since: "2023-05-18T13:15:05Z".parse().ok(),
			..Default::default()
		};

		assert_eq!(filters.filter(issue), stream_filter::Decision::End);
	}
}
