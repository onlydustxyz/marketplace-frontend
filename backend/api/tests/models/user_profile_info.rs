use diesel::Queryable;
use diesel_json::Json;
use domain::Languages;
use infrastructure::database::enums::{AllocatedTime, ProfileCover};
use uuid::Uuid;

#[derive(Debug, Clone, Queryable)]
pub struct UserProfileInfo {
	pub id: Uuid,
	pub bio: Option<String>,
	pub location: Option<String>,
	pub website: Option<String>,
	pub languages: Option<Json<Languages>>,
	pub weekly_allocated_time: AllocatedTime,
	pub looking_for_a_job: bool,
	pub avatar_url: Option<String>,
	pub cover: Option<ProfileCover>,
}
