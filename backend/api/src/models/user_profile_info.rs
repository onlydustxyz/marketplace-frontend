use diesel::Identifiable;
use diesel_json::Json;
use domain::{Languages, UserId};
use infrastructure::database::{enums::AllocatedTime, schema::user_profile_info};
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Queryable, Identifiable, Model,
)]
#[diesel(table_name = user_profile_info, treat_none_as_null = true)]
pub struct UserProfileInfo {
	pub id: UserId,
	pub bio: Option<String>,
	pub location: Option<String>,
	pub website: Option<String>,
	pub languages: Option<Json<Languages>>,
	pub weekly_allocated_time: AllocatedTime,
	pub looking_for_a_job: bool,
}

impl Identifiable for UserProfileInfo {
	type Id = UserId;

	fn id(self) -> Self::Id {
		self.id
	}
}
