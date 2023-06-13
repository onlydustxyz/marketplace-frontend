use derive_more::Constructor;
use domain::{DomainError, Languages, UserId};
use infrastructure::database::user_profile::{AllocatedTime, UserProfile};

use crate::infrastructure::database::UserProfileInfoRepository;

#[derive(Constructor)]
pub struct Usecase {
	user_profile_info_repository: UserProfileInfoRepository,
}

impl Usecase {
	pub async fn update_user_profile_info(
		&self,
		caller_id: UserId,
		bio: Option<String>,
		location: Option<String>,
		website: Option<String>,
		languages: Option<Languages>,
		weekly_allocated_time: AllocatedTime,
	) -> Result<(), DomainError> {
		self.user_profile_info_repository.upsert(&UserProfile {
			id: caller_id,
			bio,
			location,
			website,
			languages: languages.map(diesel_json::Json::new),
			weekly_allocated_time,
		})?;

		Ok(())
	}
}
