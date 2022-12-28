use domain::UserId;
use infrastructure::database::DatabaseError;
use thiserror::Error;

use crate::{
	domain::{
		user_info::{Email, Identity, Location, PayoutSettings},
		UserInfo,
	},
	infrastructure::database::UserInfoRepository,
};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to update profile info")]
	Repository(#[from] DatabaseError),
}

type Result<T> = std::result::Result<T, Error>;

pub struct Usecase {
	user_info_repository: UserInfoRepository,
}

impl Usecase {
	pub fn new(user_info_repository: UserInfoRepository) -> Self {
		Self {
			user_info_repository,
		}
	}

	pub async fn update_profile_info(
		&self,
		caller_id: UserId,
		identity: Identity,
		location: Location,
		email: Email,
		payout_settings: PayoutSettings,
	) -> Result<()> {
		let user_info = UserInfo::new(caller_id, identity, location, email, payout_settings);
		self.user_info_repository.upsert(&user_info)?;

		Ok(())
	}
}
