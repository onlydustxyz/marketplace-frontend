mod repository;

use diesel::{pg::Pg, Identifiable, Queryable};
use diesel_json::Json;
use domain::{Languages, UserId};
use infrastructure::database::{
	enums::{AllocatedTime, ProfileCover},
	schema::user_profile_info,
};
use serde::{Deserialize, Serialize};

pub use self::repository::Repository;

#[derive(Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Identifiable, Model)]
#[diesel(table_name = user_profile_info, treat_none_as_null = true)]
pub struct UserProfileInfo {
	pub id: UserId,
	pub bio: Option<String>,
	pub location: Option<String>,
	pub website: Option<String>,
	pub languages: Option<Json<Languages>>,
	pub weekly_allocated_time: AllocatedTime,
	pub looking_for_a_job: bool,
	pub cover: Option<ProfileCover>,
}

impl Identifiable for UserProfileInfo {
	type Id = UserId;

	fn id(self) -> Self::Id {
		self.id
	}
}

impl<ST> Queryable<ST, Pg> for UserProfileInfo
where
	(
		UserId,
		Option<String>,
		Option<String>,
		Option<String>,
		Option<Json<Languages>>,
		AllocatedTime,
		bool,
		Option<String>,
		Option<ProfileCover>,
	): Queryable<ST, Pg>,
{
	type Row = <(
		UserId,
		Option<String>,
		Option<String>,
		Option<String>,
		Option<Json<Languages>>,
		AllocatedTime,
		bool,
		Option<String>,
		Option<ProfileCover>,
	) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
		let (
			id,
			bio,
			location,
			website,
			languages,
			weekly_allocated_time,
			looking_for_a_job,
			_,
			cover,
		) = Queryable::build(row)?;
		Ok(Self {
			id,
			bio,
			location,
			website,
			languages,
			weekly_allocated_time,
			looking_for_a_job,
			cover,
		})
	}
}
