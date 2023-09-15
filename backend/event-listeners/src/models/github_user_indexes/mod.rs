mod repository;
use chrono::NaiveDateTime;
use diesel::{pg::Pg, Identifiable, Queryable};
use domain::GithubUserId;
use infrastructure::database::schema::github_user_indexes;
pub use repository::Repository;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(
	Debug,
	Default,
	Clone,
	Insertable,
	Identifiable,
	QueryableByName,
	Serialize,
	Deserialize,
	ImmutableModel,
)]
#[diesel(table_name = github_user_indexes, primary_key(user_id))]
pub struct GithubUserIndex {
	pub user_id: GithubUserId,
	pub indexed_at: Option<NaiveDateTime>,
}

impl<ST> Queryable<ST, Pg> for GithubUserIndex
where
	(
		GithubUserId,
		Option<Value>,
		Option<Value>,
		Option<NaiveDateTime>,
	): Queryable<ST, Pg>,
{
	type Row = <(
		GithubUserId,
		Option<Value>,
		Option<Value>,
		Option<NaiveDateTime>,
	) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
		let (user_id, _, _, indexed_at) = Queryable::build(row)?;
		Ok(Self {
			user_id,
			indexed_at,
		})
	}
}

impl Identifiable for GithubUserIndex {
	type Id = GithubUserId;

	fn id(self) -> Self::Id {
		self.user_id
	}
}
