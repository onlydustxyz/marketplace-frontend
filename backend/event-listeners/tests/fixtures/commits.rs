#![allow(unused)]
use anyhow::Result;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubCommit, GithubPullRequestId};
use event_listeners::models;
use infrastructure::database::schema::github_pull_request_commits;

use super::*;
use crate::context::github_indexer::Context;

pub fn a() -> GithubCommit {
	GithubCommit {
			sha: String::from("3e8b02526187e828f213864d16110d0982534809"),
			html_url: "https://github.com/onlydustxyz/marketplace/commit/3e8b02526187e828f213864d16110d0982534809".parse().unwrap(),
			author: users::anthony(),
		}
}

pub fn b() -> GithubCommit {
	GithubCommit {
			sha: String::from("32a353fdfb17b0b2e5328174309ecfa01e4780e5"),
			html_url: "https://github.com/onlydustxyz/marketplace/commit/32a353fdfb17b0b2e5328174309ecfa01e4780e5".parse().unwrap(),
			author: users::anthony(),
		}
}

pub fn c() -> GithubCommit {
	GithubCommit {
		sha: String::from("a60418a359dd50b36705ce2dfa5e1437e2d488c9"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/a60418a359dd50b36705ce2dfa5e1437e2d488c9".parse().unwrap(),
		author: users::ofux(),
	}
}

pub fn d() -> GithubCommit {
	GithubCommit {
		sha: String::from("b7fccc7458784d8fdc3434cfd6909ad0ed0075ab"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/b7fccc7458784d8fdc3434cfd6909ad0ed0075ab".parse().unwrap(),
		author: users::ofux(),
	}
}

pub fn e() -> GithubCommit {
	GithubCommit {
		sha: String::from("b84ff1f57e4d55d95adae8ac1d337d68d87f0eb1"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/b84ff1f57e4d55d95adae8ac1d337d68d87f0eb1".parse().unwrap(),
		author: users::ofux(),
	}
}

pub fn f() -> GithubCommit {
	GithubCommit {
		sha: String::from("10f3ec3765f0d8a8b03fa73b2eb37f7b82af8a2d"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/10f3ec3765f0d8a8b03fa73b2eb37f7b82af8a2d".parse().unwrap(),
		author: users::anthony(),
	}
}

pub fn g() -> GithubCommit {
	GithubCommit {
		sha: String::from("26bf483718f3ae262193bca39a2e283c0ad5d4ed"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/26bf483718f3ae262193bca39a2e283c0ad5d4ed".parse().unwrap(),
		author: users::ofux(),
	}
}

pub fn h() -> GithubCommit {
	GithubCommit {
			sha: String::from("28717122c963626883ce63db2a6dd7f2cbb5a7db"),
			html_url: "https://github.com/onlydustxyz/marketplace/commit/28717122c963626883ce63db2a6dd7f2cbb5a7db".parse().unwrap(),
			author: users::stan(),
		}
}

#[track_caller]
pub fn assert(
	commit: models::github_pull_requests::Commit,
	expected: GithubCommit,
	expected_pull_request_id: GithubPullRequestId,
) {
	assert_eq!(commit.pull_request_id, expected_pull_request_id);
	assert_eq!(commit.sha, expected.sha);
	assert_eq!(commit.author_id, expected.author.id);
	assert_eq!(commit.html_url, expected.html_url.to_string());
}

pub fn assert_indexed(
	context: &mut Context,
	expected: Vec<(GithubCommit, GithubPullRequestId)>,
) -> Result<()> {
	let mut connection = context.database.client.connection()?;
	let mut commits: Vec<models::github_pull_requests::Commit> = github_pull_request_commits::table
		.order((
			github_pull_request_commits::dsl::pull_request_id.asc(),
			github_pull_request_commits::dsl::sha.asc(),
		))
		.load(&mut *connection)?;

	assert_eq!(commits.len(), expected.len(), "Invalid commits count");

	commits
		.into_iter()
		.zip(expected)
		.for_each(|(commit, (expected, pr_id))| assert(commit, expected, pr_id));

	Ok(())
}
