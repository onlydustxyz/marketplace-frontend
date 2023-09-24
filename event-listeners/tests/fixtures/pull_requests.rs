#![allow(unused)]
use std::{
	collections::hash_map::DefaultHasher,
	hash::{Hash, Hasher},
};

use anyhow::Result;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubPullRequest, GithubPullRequestStatus, GithubRepo, GithubUser};
use event_listeners::models;
use infrastructure::database::schema::{github_pull_request_indexes, github_pull_requests};
use serde_json::json;

use super::*;
use crate::context::github_indexer::Context;

pub fn x1144() -> GithubPullRequest {
	GithubPullRequest {
		id: 1452363285u64.into(),
		repo_id: repos::marketplace().id,
		number: 1144u64.into(),
		title: String::from("Improve impersonation"),
		status: GithubPullRequestStatus::Closed,
		html_url: "https://github.com/onlydustxyz/marketplace/pull/1144".parse().unwrap(),
		created_at: "2023-07-27T16:46:00Z".parse().unwrap(),
		updated_at: "2023-07-28T08:34:54Z".parse().unwrap(),
		closed_at: "2023-07-28T08:34:53Z".parse().ok(),
		author: users::ofux(),
		merged_at: None,
		draft: false,
		head_sha: String::from("1c20736f7cd8ebab4d915661c57fc8a987626f9b"),
		head_repo: Some(repos::marketplace()),
		base_sha: String::from("3fb55612f69b5352997b4aeafdeea958c564074f"),
		base_repo: repos::marketplace(),
		requested_reviewers: vec![users::anthony()],
	}
}

pub fn x1146() -> GithubPullRequest {
	GithubPullRequest {
		id: 1455874031u64.into(),
		repo_id: repos::marketplace().id,
		number: 1146u64.into(),
		title: String::from("Hide tooltips on mobile"),
		status: GithubPullRequestStatus::Merged,
		html_url: "https://github.com/onlydustxyz/marketplace/pull/1146".parse().unwrap(),
		created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
		updated_at: "2023-07-31T09:32:08Z".parse().unwrap(),
		closed_at: "2023-07-31T09:32:08Z".parse().ok(),
		author: users::alex(),
		merged_at: "2023-07-31T09:32:08Z".parse().ok(),
		draft: false,
		head_sha: String::from("559e878ff141f16885f2372456dffdb2cb223843"),
		head_repo: Some(repos::marketplace()),
		base_sha: String::from("979a35c6fe75aa304d1ad5a4b7d222ecfd308dc3"),
		base_repo: repos::marketplace(),
		requested_reviewers: vec![users::anthony()],
	}
}

pub fn x1152() -> GithubPullRequest {
	GithubPullRequest {
		id: 1458220740u64.into(),
		repo_id: repos::marketplace().id,
		number: 1152u64.into(),
		title: String::from("[E-642] Index extra fields in github pull requests"),
		status: GithubPullRequestStatus::Open,
		html_url: "https://github.com/onlydustxyz/marketplace/pull/1152".parse().unwrap(),
		created_at: "2023-08-01T14:26:33Z".parse().unwrap(),
		updated_at: "2023-08-01T14:26:41Z".parse().unwrap(),
		closed_at: None,
		author: users::anthony(),
		merged_at: None,
		draft: true,
		head_sha: String::from("7cf6b6e5631a6f462d17cc0ef175e23b8efa9f00"),
		head_repo: Some(GithubRepo {
			parent: None,
			..repos::marketplace_fork()
		}),
		base_sha: String::from("fad8ea5cd98b89367fdf80b09d8796b093d2dac8"),
		base_repo: repos::marketplace(),
		requested_reviewers: vec![],
	}
}

pub fn x1152_updated() -> GithubPullRequest {
	GithubPullRequest {
		id: 1458220740u64.into(),
		repo_id: repos::marketplace().id,
		number: 1152u64.into(),
		title: String::from("[E-642] Index extra fields in github pull requests 2"),
		status: GithubPullRequestStatus::Open,
		html_url: "https://github.com/onlydustxyz/marketplace/pull/1152".parse().unwrap(),
		created_at: "2023-08-01T14:26:33Z".parse().unwrap(),
		updated_at: "2023-08-02T14:26:41Z".parse().unwrap(),
		closed_at: None,
		author: users::anthony(),
		merged_at: None,
		draft: true,
		head_sha: String::from("9999b6e5631a6f462d17cc0ef175e23b8efa9999"),
		head_repo: Some(GithubRepo {
			parent: None,
			..repos::marketplace_fork()
		}),
		base_sha: String::from("fad8ea5cd98b89367fdf80b09d8796b093d2dac8"),
		base_repo: repos::marketplace(),
		requested_reviewers: vec![],
	}
}

#[track_caller]
pub fn assert_eq(pull_request: models::github_pull_requests::Inner, expected: GithubPullRequest) {
	assert_eq!(pull_request.id, expected.id);
	assert_eq!(pull_request.repo_id, repos::marketplace().id);
	assert_eq!(pull_request.number, expected.number);
	assert_eq!(pull_request.created_at, expected.created_at.naive_utc());
	assert_eq!(pull_request.author_id, expected.author.id);
	assert_eq!(
		pull_request.merged_at,
		expected.merged_at.map(|d| d.naive_utc())
	);
	assert_eq!(pull_request.status, expected.status.into());
	assert_eq!(pull_request.title, expected.title);
	assert_eq!(pull_request.html_url, expected.html_url.to_string());
	assert_eq!(
		pull_request.closed_at,
		expected.closed_at.map(|d| d.naive_utc())
	);
	assert_eq!(pull_request.draft, expected.draft);
}

#[track_caller]
pub fn assert_indexed(context: &mut Context, expected: Vec<GithubPullRequest>) -> Result<()> {
	let mut connection = context.database.client.connection()?;

	let mut pull_requests: Vec<models::github_pull_requests::Inner> = github_pull_requests::table
		.order(github_pull_requests::number.asc())
		.load(&mut *connection)?;

	assert_eq!(
		pull_requests.len(),
		expected.len(),
		"Invalid pull request count"
	);

	for (pull_request, expected) in pull_requests.into_iter().zip(expected) {
		assert_eq(pull_request, expected.clone());

		let mut state: models::GithubPullRequestIndex = github_pull_request_indexes::table
			.filter(github_pull_request_indexes::pull_request_id.eq(expected.id))
			.get_result(&mut *connection)?;

		assert_eq!(
			state.pull_request_indexer_state,
			Some(
				json!({"base_sha": expected.base_sha, "head_sha": expected.head_sha, "hash": hash(&expected)})
			)
		);
	}

	Ok(())
}

fn hash<T: Hash>(t: &T) -> u64 {
	let mut s = DefaultHasher::new();
	t.hash(&mut s);
	s.finish()
}
