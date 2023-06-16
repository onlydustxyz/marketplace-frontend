use std::sync::Arc;

use derive_more::Constructor;
use domain::{DomainError, Languages, UserId};
use infrastructure::database::enums::AllocatedTime;

use crate::models::*;

#[derive(Constructor)]
pub struct Usecase {
	user_profile_info_repository: UserProfileInfoRepository,
	contact_informations_repository: Arc<dyn ContactInformationsRepository>,
}

impl Usecase {
	#[allow(clippy::too_many_arguments)]
	pub async fn update_user_profile_info(
		&self,
		caller_id: UserId,
		bio: Option<String>,
		location: Option<String>,
		website: Option<String>,
		languages: Option<Languages>,
		weekly_allocated_time: AllocatedTime,
		looking_for_a_job: bool,
		contact_informations: Vec<ContactInformation>,
	) -> Result<(), DomainError> {
		self.user_profile_info_repository.upsert(&UserProfileInfo {
			id: caller_id,
			bio,
			location,
			website,
			languages: languages.map(diesel_json::Json::new),
			looking_for_a_job,
			weekly_allocated_time,
		})?;

		self.contact_informations_repository
			.replace_all_for_user(&caller_id, contact_informations)?;

		Ok(())
	}
}
