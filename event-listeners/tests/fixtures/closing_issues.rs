#![allow(unused)]
use anyhow::Result;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use event_listeners::models::github_pull_requests::ClosingIssue;
use infrastructure::database::schema::closing_issues;

use super::*;
use crate::context::github_indexer::Context;

#[track_caller]
pub fn assert_indexed(context: &mut Context, expected: Vec<ClosingIssue>) -> Result<()> {
	let mut connection = context.database.client.connection()?;
	let mut closing_issues: Vec<ClosingIssue> = closing_issues::table
		.order((
			closing_issues::dsl::github_pull_request_id.asc(),
			closing_issues::dsl::github_issue_id.asc(),
		))
		.load(&mut *connection)?;

	assert_eq!(
		closing_issues.len(),
		expected.len(),
		"Invalid closing issue count"
	);

	for (closing_issue, expected) in closing_issues.into_iter().zip(expected) {
		assert_eq!(closing_issue, expected);
	}

	Ok(())
}
