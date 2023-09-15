use std::sync::Arc;

use anyhow::anyhow;
use domain::UserId;
use infrastructure::database::{DatabaseError, Repository};
use thiserror::Error;

use crate::{domain::ArePayoutSettingsValid, models::*};

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
	user_payout_info_repository: Arc<dyn Repository<UserPayoutInfo>>,
	payout_settings_are_valid: ArePayoutSettingsValid,
}

impl Usecase {
	pub fn new(
		user_payout_info_repository: Arc<dyn Repository<UserPayoutInfo>>,
		payout_settings_are_valid: ArePayoutSettingsValid,
	) -> Self {
		Self {
			user_payout_info_repository,
			payout_settings_are_valid,
		}
	}

	pub async fn update_user_payout_info(
		&self,
		caller_id: UserId,
		identity: Option<Identity>,
		location: Option<Location>,
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

		self.user_payout_info_repository.upsert(UserPayoutInfo {
			user_id: caller_id,
			identity,
			location,
			payout_settings,
		})?;

		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use domain::{EthereumIdentity, EthereumName};
	use infrastructure::database::{ImmutableRepository, Result};
	use mockall::{mock, predicate::eq};
	use rstest::{fixture, rstest};

	use super::*;

	mock! {
		pub UserPayoutInfoRepository {}

		impl ImmutableRepository<UserPayoutInfo> for UserPayoutInfoRepository {
			fn exists(&self, id: UserId) -> Result<bool>;
			fn find_by_id(&self, id: UserId) -> Result<UserPayoutInfo>;
			fn list(&self) -> Result<Vec<UserPayoutInfo>>;
			fn insert(&self, model: UserPayoutInfo) -> Result<UserPayoutInfo>;
			fn try_insert(&self, model: UserPayoutInfo) -> Result<Option<UserPayoutInfo>>;
			fn delete(&self, id: UserId) -> Result<UserPayoutInfo>;
			fn clear(&self) -> Result<()>;
			fn insert_all(&self, models: Vec<UserPayoutInfo>) -> Result<()>;
			fn try_insert_all(&self, models: Vec<UserPayoutInfo>) -> Result<()>;
		}

		impl Repository<UserPayoutInfo> for UserPayoutInfoRepository {
			fn update(&self, model: UserPayoutInfo) -> Result<UserPayoutInfo>;
			fn upsert(&self, model: UserPayoutInfo) -> Result<UserPayoutInfo>;
		}
	}

	#[fixture]
	fn payout_settings() -> PayoutSettings {
		PayoutSettings::EthTransfer(EthereumIdentity::Name(
			EthereumName::new(Default::default()),
		))
	}

	#[rstest]
	#[tokio::test]
	async fn upsert_user_info_upon_valid_input(payout_settings: PayoutSettings) {
		let mut user_info_repository = MockUserPayoutInfoRepository::default();
		user_info_repository.expect_upsert().once().returning(Ok);

		let mut payout_settings_valid = ArePayoutSettingsValid::default();
		payout_settings_valid
			.expect_is_satisfied_by()
			.once()
			.with(eq(payout_settings.clone()))
			.returning(|_| Ok(true));

		let usecase = Usecase::new(Arc::new(user_info_repository), payout_settings_valid);
		let result = usecase
			.update_user_payout_info(
				Default::default(),
				Some(Identity::Person(Default::default())),
				Default::default(),
				Some(payout_settings),
			)
			.await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn reject_upon_invalid_payout_settings(payout_settings: PayoutSettings) {
		let user_info_repository = MockUserPayoutInfoRepository::default();
		let mut payout_settings_valid = ArePayoutSettingsValid::default();
		payout_settings_valid
			.expect_is_satisfied_by()
			.once()
			.with(eq(payout_settings.clone()))
			.returning(|_| Ok(false));

		let usecase = Usecase::new(Arc::new(user_info_repository), payout_settings_valid);
		let result = usecase
			.update_user_payout_info(
				Default::default(),
				Some(Identity::Person(Default::default())),
				Default::default(),
				Some(payout_settings),
			)
			.await;
		assert!(result.is_err());
	}
}
