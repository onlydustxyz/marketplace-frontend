use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{
	schema::indexer_clean::pull_request_closing_issues, Error,
};

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
#[diesel(primary_key(pull_request_id, issue_id))]
pub struct PullRequestClosingIssue {
	pub pull_request_id: i64,
	pub issue_id: i64,
	pub indexed_at: NaiveDateTime,
}

impl Identifiable for PullRequestClosingIssue {
	type Id = (i64, i64);

	fn id(self) -> Self::Id {
		(self.pull_request_id, self.issue_id)
	}
}

impl TryFrom<(models::PullRequestId, models::IssueId)> for PullRequestClosingIssue {
	type Error = Error;

	fn try_from(
		(pull_request_id, issue_id): (models::PullRequestId, models::IssueId),
	) -> Result<Self, Self::Error> {
		Ok(Self {
			pull_request_id: pull_request_id.0 as i64,
			issue_id: issue_id.0 as i64,
			indexed_at: Utc::now().naive_utc(),
		})
	}
}
