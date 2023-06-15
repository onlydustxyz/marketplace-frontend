use diesel_json::Json;
use domain::{Languages, UserId};
use serde::{Deserialize, Serialize};

use crate::database::schema::user_profile_info;

mod allocated_time;
pub use self::allocated_time::AllocatedTime;

#[derive(
	Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Queryable, Identifiable,
)]
#[diesel(table_name = user_profile_info, treat_none_as_null = true)]
pub struct UserProfile {
	pub id: UserId,
	pub bio: Option<String>,
	pub location: Option<String>,
	pub website: Option<String>,
	pub languages: Option<Json<Languages>>,
	pub weekly_allocated_time: AllocatedTime,
	pub looking_for_a_job: bool,
}

impl domain::Entity for UserProfile {
	type Id = UserId;
}
