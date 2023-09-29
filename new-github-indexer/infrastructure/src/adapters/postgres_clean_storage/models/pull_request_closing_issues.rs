use chrono::NaiveDateTime;
use diesel::Identifiable;

use crate::adapters::postgres_clean_storage::schema::indexer_clean::pull_request_closing_issues;

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
