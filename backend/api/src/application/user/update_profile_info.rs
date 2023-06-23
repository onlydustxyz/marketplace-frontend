use std::sync::Arc;

use derive_more::Constructor;
use domain::{DomainError, Languages, UserId};
use infrastructure::database::enums::{AllocatedTime, ProfileCover};

use crate::{domain::ImageStoreService, models::*};

#[derive(Constructor)]
pub struct Usecase {
	user_profile_info_repository: Arc<dyn UserProfileInfoRepository>,
	contact_informations_repository: Arc<dyn ContactInformationsRepository>,
	image_store: Arc<dyn ImageStoreService>,
}

impl Usecase {
	#[allow(clippy::too_many_arguments)]
	pub async fn update_user_profile_info(
		&self,
		id: UserId,
		bio: Option<String>,
		location: Option<String>,
		website: Option<String>,
		languages: Option<Languages>,
		weekly_allocated_time: AllocatedTime,
		looking_for_a_job: bool,
		contact_informations: Vec<ContactInformation>,
		cover: Option<ProfileCover>,
	) -> Result<(), DomainError> {
		self.user_profile_info_repository.upsert(UserProfileInfo {
			id,
			bio,
			location,
			website,
			languages: languages.map(diesel_json::Json::new),
			looking_for_a_job,
			weekly_allocated_time,
			cover,
		})?;

		self.contact_informations_repository
			.replace_all_for_user(&id, contact_informations)?;

		Ok(())
	}

	pub async fn update_user_avatar(
		&self,
		id: UserId,
		avatar_data: Vec<u8>,
	) -> Result<(), DomainError> {
		let avatar_url = self.image_store.store_image(avatar_data).await?;
		self.user_profile_info_repository
			.update_user_avatar(id, avatar_url.to_string())?;

		Ok(())
	}
}
