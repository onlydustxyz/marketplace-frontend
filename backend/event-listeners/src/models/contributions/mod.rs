use diesel::{pg::Pg, Identifiable, Queryable};
use domain::{GithubRepoId, GithubUserId};
use infrastructure::database::{enums::ContributionType, schema::contributions, enums::ContributionStatus};
use serde::{Deserialize, Serialize};

mod details_id;
pub use details_id::DetailsId;

mod repository;
pub use repository::Repository;

#[derive(
	Debug,
	Clone,
	Insertable,
	AsChangeset,
	Identifiable,
	Serialize,
	Deserialize,
	Model,
	PartialEq,
	Eq,
	Hash,
)]
#[diesel(primary_key(type_, details_id, user_id))]
pub struct Contribution {
	pub repo_id: GithubRepoId,
	pub user_id: GithubUserId,
	pub type_: ContributionType,
	pub details_id: DetailsId,
	pub status_: ContributionStatus,
}

impl Identifiable for Contribution {
	type Id = (ContributionType, DetailsId, GithubUserId);

	fn id(self) -> Self::Id {
		(self.type_, self.details_id, self.user_id)
	}
}

impl<ST> Queryable<ST, Pg> for Contribution
where
	(GithubRepoId, GithubUserId, ContributionType, i64, ContributionStatus): Queryable<ST, Pg>,
{
	type Row = <(GithubRepoId, GithubUserId, ContributionType, i64, ContributionStatus) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
		let (repo_id, user_id, type_, details_id, status_) = Queryable::build(row)?;

		Ok(Self {
			repo_id,
			user_id,
			type_,
			details_id: match type_ {
				ContributionType::Issue => DetailsId::Issue(details_id.into()),
				ContributionType::PullRequest | ContributionType::CodeReview =>
					DetailsId::PullRequest(details_id.into()),
			},
			status_,
		})
	}
}
