use std::{fmt::Display, hash::Hash, str::FromStr};

use chrono::{DateTime, Utc};
use derive_more::{AsRef, From, Into};
use generic_array::{typenum::U32, GenericArray};
use serde::{Deserialize, Serialize};
use serde_with::{DeserializeFromStr, SerializeDisplay};
use sha2::{Digest, Sha256};

use super::{PullRequestId, User};

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub struct CodeReview {
	pub pull_request_id: PullRequestId,
	pub reviewer: User,
	pub status: Status,
	pub outcome: Option<Outcome>,
	pub submitted_at: Option<DateTime<Utc>>,
}

impl CodeReview {
	pub fn id(&self) -> Id {
		Sha256::digest(format!("({},{})", self.pull_request_id, self.reviewer.id)).into()
	}
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub enum Status {
	Pending,
	Completed,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub enum Outcome {
	ChangeRequested,
	Approved,
}

#[derive(
	Debug,
	Clone,
	Copy,
	Default,
	SerializeDisplay,
	DeserializeFromStr,
	PartialEq,
	Eq,
	Hash,
	From,
	Into,
	AsRef,
	PartialOrd,
	Ord,
)]
pub struct Id(GenericArray<u8, U32>);

impl Display for Id {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{:#x}", self.0)
	}
}

impl FromStr for Id {
	type Err = anyhow::Error;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		Ok(GenericArray::clone_from_slice(hex::decode(s)?.as_slice()).into())
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::GithubUserId;

	#[test]
	fn test_id_generation() {
		//! WARNING: Modifying this test means that all existing ids in database must be updated

		let code_review = CodeReview {
			pull_request_id: PullRequestId::from(978417613_u64),
			reviewer: User {
				id: GithubUserId::from(43467246_u64),
				login: "AnthonyBuisset".parse().unwrap(),
				avatar_url: "https://avatars.githubusercontent.com/u/43467246?v=4".parse().unwrap(),
				html_url: "https://api.github.com/users/AnthonyBuisset".parse().unwrap(),
			},
			status: Status::Pending,
			outcome: None,
			submitted_at: None,
		};

		assert_eq!(
			code_review.id().to_string(),
			"aa55ee26b5308567ca227deb2b5c801635af6463ac619fbecd28b7e15326c0c3"
		);

		assert_eq!(
			code_review.id(),
			"aa55ee26b5308567ca227deb2b5c801635af6463ac619fbecd28b7e15326c0c3"
				.parse()
				.unwrap()
		);
	}
}
