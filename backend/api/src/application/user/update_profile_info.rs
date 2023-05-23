use anyhow::anyhow;

use domain::{
    user_info::{ContactInformation, Identity, Location, PayoutSettings},
    ArePayoutSettingsValid, UserId, UserInfo,
};

use infrastructure::database::DatabaseError;
use thiserror::Error;

/// Error type for the update profile info use case.
#[derive(Debug, Error)]
pub enum Error {
    /// Error while updating user info in the repository.
    #[error("Unable to update profile info")]
    Repository(#[from] DatabaseError),
    /// Provided input is invalid.
    #[error("Provided input is invalid")]
    InvalidInput(#[source] anyhow::Error),
    /// Internal error.
    #[error("Internal error")]
    Internal(#[source] anyhow::Error),
}

/// Result type for the update profile info use case.
pub type Result<T> = std::result::Result<T, Error>;

/// Use case for updating user profile information.
pub struct Usecase {
    user_info_repository: UserInfoRepository,
    payout_settings_are_valid: ArePayoutSettingsValid,
}

impl Usecase {
    /// Creates a new instance of the update profile info use case.
    ///
    /// # Arguments
    ///
    /// * `user_info_repository` - The repository to use for user info storage.
    /// * `payout_settings_are_valid` - Validator for payout settings.
    pub fn new(
        user_info_repository: UserInfoRepository,
        payout_settings_are_valid: ArePayoutSettingsValid,
    ) -> Self {
        Self {
            user_info_repository,
            payout_settings_are_valid,
        }
    }

    /// Updates the provided user's profile information.
    ///
    /// # Arguments
    ///
    /// * `caller_id` - Identifier of the user requesting the update.
    /// * `identity` - New identity information to update.
    /// * `location` - New location information to update.
    /// * `payout_settings` - New payout settings to update.
    /// * `contact_information` - New contact information to update.
    ///
    /// # Errors
    ///
    /// Returns an error if any of the provided input is invalid or an internal error occurs.
    pub async fn update_profile_info(
        &self,
        caller_id: UserId,
        identity: Option<Identity>,
        location: Option<Location>,
        payout_settings: Option<PayoutSettings>,
        contact_information: Option<ContactInformation>,
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

        let user_info = UserInfo::new(
            caller_id,
            identity,
            location,
            payout_settings,
            contact_information,
        );
        self.user_info_repository.upsert(&user_info)?;

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use domain::{EthereumIdentity, EthereumName};
    use mockall::predicate::eq;
    use rstest::{fixture, rstest};

    use super::*;

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
                Some(payout_settings),
                Default::default(),
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
                Some(payout_settings),
                Default::default(),
            )
            .await;
        assert!(result.is_err());
    }
}