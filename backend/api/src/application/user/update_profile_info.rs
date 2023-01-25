use anyhow::anyhow;
use domain::UserId;
use infrastructure::database::DatabaseError;
use thiserror::Error;

use crate::{
	domain::{
		user_info::{Email, Identity, Location, PayoutSettings},
		ArePayoutSettingsValid, UserInfo,
	},
	infrastructure::database::UserInfoRepository,
};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to update profile info")]
	Repository(#[from] DatabaseError),
	#[error("Provided input is invalid")]
	InvalidInput(#[source] anyhow::Error),
	#[error("Internal error")]
	Internal(#[source] anyhow::Error),
}

type Result<T> = std::result::Result<T, Error>;

pub struct Usecase {
	user_info_repository: UserInfoRepository,
	payout_settings_are_valid: ArePayoutSettingsValid,
}

impl Usecase {
	pub fn new(
		user_info_repository: UserInfoRepository,
		payout_settings_are_valid: ArePayoutSettingsValid,
	) -> Self {
		Self {
			user_info_repository,
			payout_settings_are_valid,
		}
	}

	pub async fn update_profile_info(
		&self,
		caller_id: UserId,
		identity: Option<Identity>,
		location: Option<Location>,
		email: Option<Email>,
		payout_settings: Option<PayoutSettings>,
	) -> Result<()> {
		if let Some(payout_settings_value) = &payout_settings {
			if !self
				.payout_settings_are_valid
				.is_satisfied_by(payout_settings_value)
				.await
				.map_err(|e| Error::Internal(anyhow!(e)))?
			{
				return Err(Error::InvalidInput(anyhow!("Invalid payout settings")));
			}
		}

		let user_info = UserInfo::new(caller_id, identity, location, email, payout_settings);
		self.user_info_repository.upsert(&user_info)?;

		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use mockall::predicate::eq;
	use rstest::{fixture, rstest};

	use super::*;
	use crate::domain::user_info::{EthereumIdentity, EthereumName};

	#[fixture]
	fn payout_settings() -> PayoutSettings {
		PayoutSettings::EthTransfer(EthereumIdentity::Name(
			EthereumName::new(Default::default()),
		))
	}

	#[rstest]
	async fn upsert_user_info_upon_valid_input(payout_settings: PayoutSettings) {
		let mut user_info_repository = UserInfoRepository::default();
		user_info_repository.expect_upsert().once().returning(|_| Ok(()));

		let mut payout_settings_valid = ArePayoutSettingsValid::default();
		payout_settings_valid
			.expect_is_satisfied_by()
			.once()
			.with(eq(payout_settings.clone()))
			.returning(|_| Ok(true));

		let usecase = Usecase::new(user_info_repository, payout_settings_valid);
		let result = usecase
			.update_profile_info(
				Default::default(),
				Some(Identity::Person(Default::default())),
				Default::default(),
				Default::default(),
				Some(payout_settings),
			)
			.await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	async fn reject_upon_invalid_payout_settings(payout_settings: PayoutSettings) {
		let user_info_repository = UserInfoRepository::default();
		let mut payout_settings_valid = ArePayoutSettingsValid::default();
		payout_settings_valid
			.expect_is_satisfied_by()
			.once()
			.with(eq(payout_settings.clone()))
			.returning(|_| Ok(false));

		let usecase = Usecase::new(user_info_repository, payout_settings_valid);
		let result = usecase
			.update_profile_info(
				Default::default(),
				Some(Identity::Person(Default::default())),
				Default::default(),
				Default::default(),
				Some(payout_settings),
			)
			.await;
		assert!(result.is_err());
	}
}
