use std::hash::Hash;

use chrono::NaiveDateTime;
use diesel::{pg::Pg, Identifiable, Queryable};
use domain::{GithubRepoId, GithubUserId};
use infrastructure::database::{
	enums::{ContributionStatus, ContributionType},
	schema::contributions,
};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

mod details_id;
pub use details_id::DetailsId;

mod repository;
pub use repository::Repository;

#[derive(
	Debug,
	Clone,
	Insertable,
	Identifiable,
	AsChangeset,
	Serialize,
	Deserialize,
	Model,
	PartialEq,
	Eq,
	Hash,
)]
pub struct Contribution {
	pub repo_id: GithubRepoId,
	pub user_id: GithubUserId,
	pub type_: ContributionType,
	pub details_id: DetailsId,
	pub status: ContributionStatus,
	pub created_at: NaiveDateTime,
	pub closed_at: Option<NaiveDateTime>,
	pub id: String,
}

impl Contribution {
	pub fn new(
		repo_id: GithubRepoId,
		user_id: GithubUserId,
		type_: ContributionType,
		details_id: DetailsId,
		status: ContributionStatus,
		created_at: NaiveDateTime,
		closed_at: Option<NaiveDateTime>,
	) -> Self {
		Self {
			repo_id,
			user_id,
			type_,
			details_id,
			status,
			created_at,
			closed_at,
			id: format!(
				"{:#x}",
				Sha256::digest(format!("({},{},{})", type_, details_id, user_id))
			),
		}
	}
}

impl Identifiable for Contribution {
	type Id = String;

	fn id(self) -> Self::Id {
		self.id
	}
}

impl<ST> Queryable<ST, Pg> for Contribution
where
	(
		GithubRepoId,
		GithubUserId,
		ContributionType,
		String,
		ContributionStatus,
		NaiveDateTime,
		Option<NaiveDateTime>,
		String,
	): Queryable<ST, Pg>,
{
	type Row = <(
		GithubRepoId,
		GithubUserId,
		ContributionType,
		String,
		ContributionStatus,
		NaiveDateTime,
		Option<NaiveDateTime>,
		String,
	) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
		let (repo_id, user_id, type_, details_id, status, created_at, closed_at, id) =
			Queryable::build(row)?;

		Ok(Self {
			repo_id,
			user_id,
			type_,
			details_id: match type_ {
				ContributionType::Issue => DetailsId::Issue(details_id.parse::<u64>()?.into()),
				ContributionType::PullRequest =>
					DetailsId::PullRequest(details_id.parse::<u64>()?.into()),
				ContributionType::CodeReview => DetailsId::CodeReview(details_id.parse()?),
			},
			status,
			created_at,
			closed_at,
			id,
		})
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_id_generation() {
		//! WARNING: Modifying this test means that all existing ids in database must be updated

		let contribution = Contribution::new(
			GithubRepoId::from(485838614_u64),
			GithubUserId::from(99273364_u64),
			ContributionType::PullRequest,
			DetailsId::PullRequest(1111346398_u64.into()),
			ContributionStatus::InProgress,
			"2023-09-06T00:00:00".parse().unwrap(),
			None,
		);

		assert_eq!(
			contribution.id,
			"2cb196cc21932e69bcdeb18907cbd123e229508aa6ccc3bb6272330a39f7ae93"
		);
	}
}
