#![allow(unused)]
use anyhow::Result;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubIssue, GithubIssueStatus, GithubRepo, GithubUser};
use event_listeners::models;
use infrastructure::database::schema::github_issues;

use super::*;
use crate::context::github_indexer::Context;

pub fn x1061() -> GithubIssue {
	GithubIssue {
		id: 1763108414u64.into(),
		repo_id: repos::marketplace().id,
		number: 1061u64.into(),
		title: String::from("A completed issue"),
		status: GithubIssueStatus::Completed,
		html_url: "https://github.com/onlydustxyz/marketplace/issues/1061".parse().unwrap(),
		created_at: "2023-06-19T09:16:20Z".parse().unwrap(),
		updated_at: "2023-07-31T07:49:25Z".parse().unwrap(),
		closed_at: "2023-07-31T07:49:13Z".parse().ok(),
		author: users::od_develop(),
		assignees: vec![users::ofux()],
		comments_count: 0,
	}
}

pub fn x1141() -> GithubIssue {
	GithubIssue {
		id: 1822333508u64.into(),
		repo_id: repos::marketplace().id,
		number: 1141u64.into(),
		title: String::from("A cancelled issue"),
		status: GithubIssueStatus::Cancelled,
		html_url: "https://github.com/onlydustxyz/marketplace/issues/1141".parse().unwrap(),
		created_at: "2023-07-26T12:39:59Z".parse().unwrap(),
		updated_at: "2023-07-31T07:48:27Z".parse().unwrap(),
		closed_at: "2023-07-27T15:43:37Z".parse().ok(),
		author: users::anthony(),
		assignees: vec![],
		comments_count: 2,
	}
}

pub fn x1145() -> GithubIssue {
	GithubIssue {
		id: 1828603947u64.into(),
		repo_id: repos::marketplace().id,
		number: 1145u64.into(),
		title: String::from("Some issue to be resolved"),
		status: GithubIssueStatus::Open,
		html_url: "https://github.com/onlydustxyz/marketplace/issues/1145".parse().unwrap(),
		created_at: "2023-07-31T07:46:18Z".parse().unwrap(),
		updated_at: "2023-07-31T07:46:18Z".parse().unwrap(),
		closed_at: None,
		author: users::anthony(),
		assignees: vec![],
		comments_count: 0,
	}
}

#[track_caller]
pub fn assert_eq(issue: models::GithubIssue, expected: GithubIssue) {
	assert_eq!(issue.id, expected.id);
	assert_eq!(issue.repo_id, expected.repo_id);
	assert_eq!(issue.number, expected.number);
	assert_eq!(issue.title, expected.title);
	assert_eq!(issue.status, expected.status.into());
	assert_eq!(issue.html_url, expected.html_url.to_string());
	assert_eq!(issue.created_at, expected.created_at.naive_utc());
	assert_eq!(
		issue.closed_at,
		expected.closed_at.map(|date| date.naive_utc())
	);
	assert_eq!(issue.author_id, expected.author.id);
	assert_eq!(
		issue.assignee_ids.0,
		expected.assignees.into_iter().map(|user| user.id).collect::<Vec<_>>()
	);
	assert_eq!(issue.comments_count as usize, expected.comments_count);
}

#[track_caller]
pub fn assert_indexed(context: &mut Context, expected: Vec<GithubIssue>) -> Result<()> {
	let mut connection = context.database.client.connection()?;

	let mut issues: Vec<models::GithubIssue> =
		github_issues::table.order(github_issues::number.asc()).load(&mut *connection)?;

	assert_eq!(issues.len(), expected.len(), "Invalid issues count");

	for (issue, expected) in issues.into_iter().zip(expected) {
		assert_eq(issue, expected);
	}

	Ok(())
}
