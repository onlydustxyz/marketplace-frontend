use derive_more::Constructor;
use domain::{DomainError, Languages, UserId};
use infrastructure::database::{
	contact_information::ContactInformation,
	user_profile::{AllocatedTime, UserProfile},
};

use crate::infrastructure::database::{ContactInformationsRepository, UserProfileInfoRepository};

#[derive(Constructor)]
pub struct Usecase {
	user_profile_info_repository: UserProfileInfoRepository,
	contact_informations_repository: ContactInformationsRepository,
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
		contact_informations: Vec<ContactInformation>,
	) -> Result<(), DomainError> {
		self.user_profile_info_repository.upsert(&UserProfile {
			id: caller_id,
			bio,
			location,
			website,
			languages: languages.map(diesel_json::Json::new),
			weekly_allocated_time,
		})?;

		self.contact_informations_repository
			.replace_all_for_user(&caller_id, contact_informations)?;

		Ok(())
	}
}
