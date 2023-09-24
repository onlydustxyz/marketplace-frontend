use std::{fmt::Display, str::FromStr};

use chrono::{DateTime, Utc};
use derive_more::{AsRef, Display, From, Into};
use diesel_derive_newtype::DieselNewType;
use serde::{Deserialize, Serialize};
use url::Url;

use crate::{GithubCodeReview, GithubCommit, GithubIssueId, GithubRepo, GithubRepoId, GithubUser};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, PartialOrd, Ord)]
pub enum Status {
	Open,
	Closed,
	Merged,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, PartialOrd, Ord)]
pub enum CiChecks {
	Passed,
	Failed,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub struct PullRequest {
	pub id: Id,
	pub repo_id: GithubRepoId,
	pub number: Number,
	pub title: String,
	pub author: GithubUser,
	pub html_url: Url,
	pub status: Status,
	pub created_at: DateTime<Utc>,
	pub updated_at: DateTime<Utc>,
	pub merged_at: Option<DateTime<Utc>>,
	pub closed_at: Option<DateTime<Utc>>,
	pub draft: bool,
	pub head_sha: String,
	pub head_repo: Option<GithubRepo>,
	pub base_sha: String,
	pub base_repo: GithubRepo,
	pub requested_reviewers: Vec<GithubUser>,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub struct FullPullRequest {
	pub inner: PullRequest,
	pub ci_checks: Option<CiChecks>,
	pub commits: Option<Vec<GithubCommit>>,
	pub reviews: Option<Vec<GithubCodeReview>>,
	pub closing_issue_ids: Option<Vec<GithubIssueId>>,
}

impl Display for PullRequest {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "[{}] {}/{}", self.id, self.repo_id, self.number)
	}
}

#[derive(
	Debug,
	Clone,
	Copy,
	Default,
	Serialize,
	Deserialize,
	PartialEq,
	Eq,
	Hash,
	Display,
	From,
	Into,
	AsRef,
	DieselNewType,
	PartialOrd,
	Ord,
)]
pub struct Number(i64);

impl FromStr for Number {
	type Err = <i64 as FromStr>::Err;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		i64::from_str(s).map(Into::into)
	}
}

impl From<Number> for u64 {
	fn from(value: Number) -> Self {
		value.0 as u64
	}
}

impl From<u64> for Number {
	fn from(value: u64) -> Self {
		(value as i64).into()
	}
}

#[derive(
	Debug,
	Clone,
	Copy,
	Default,
	Serialize,
	Deserialize,
	PartialEq,
	Eq,
	Hash,
	Display,
	From,
	Into,
	AsRef,
	DieselNewType,
	PartialOrd,
	Ord,
)]
pub struct Id(i64);

impl FromStr for Id {
	type Err = <i64 as FromStr>::Err;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		i64::from_str(s).map(Into::into)
	}
}

impl From<Id> for u64 {
	fn from(value: Id) -> Self {
		value.0 as u64
	}
}

impl From<u64> for Id {
	fn from(value: u64) -> Self {
		(value as i64).into()
	}
}
