mod repository;
use diesel_json::Json;
use domain::{Languages, UserId};
use infrastructure::database::{enums::AllocatedTime, schema::user_profile_info};
#[cfg(test)]
pub use repository::MockRepository;
pub use repository::Repository;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Queryable, Identifiable,
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

impl domain::Entity for UserProfileInfo {
	type Id = UserId;
}
