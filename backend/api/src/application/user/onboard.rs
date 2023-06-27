use std::sync::Arc;

use chrono::Utc;
use domain::UserId;
use infrastructure::database::{DatabaseError, Repository};
use thiserror::Error;

use crate::models::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to update onboarding state")]
	Repository(#[from] DatabaseError),
}

type Result<T> = std::result::Result<T, Error>;

pub struct Usecase {
	onboarding_repository: Arc<dyn Repository<Onboarding>>,
}

impl Usecase {
	pub fn new(onboarding_repository: Arc<dyn Repository<Onboarding>>) -> Self {
		Self {
			onboarding_repository,
		}
	}

	pub async fn accept_terms_and_conditions(&self, caller_id: UserId) -> Result<()> {
		self.onboarding_repository.upsert(Onboarding {
			user_id: caller_id,
			terms_and_conditions_acceptance_date: Some(Utc::now().naive_utc()),
			profile_wizard_display_date: None,
		})?;

		Ok(())
	}

	pub async fn mark_profile_wizard_as_displayed(&self, caller_id: UserId) -> Result<()> {
		self.onboarding_repository.upsert(Onboarding {
			user_id: caller_id,
			terms_and_conditions_acceptance_date: None,
			profile_wizard_display_date: Some(Utc::now().naive_utc()),
		})?;

		Ok(())
	}
}
