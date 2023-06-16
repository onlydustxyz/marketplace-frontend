use chrono::Utc;
use domain::UserId;
use infrastructure::database::DatabaseError;
use thiserror::Error;

use crate::models::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to update terms and conditions acceptance")]
	Repository(#[from] DatabaseError),
}

type Result<T> = std::result::Result<T, Error>;

pub struct Usecase {
	terms_and_conditions_acceptance_repository: TermsAndConditionsAcceptanceRepository,
}

impl Usecase {
	pub fn new(
		terms_and_conditions_acceptance_repository: TermsAndConditionsAcceptanceRepository,
	) -> Self {
		Self {
			terms_and_conditions_acceptance_repository,
		}
	}

	pub async fn accept_terms_and_conditions(&self, caller_id: UserId) -> Result<()> {
		let terms_and_conditions_acceptance =
			TermsAndConditionsAcceptance::new(caller_id, Utc::now().naive_utc());

		self.terms_and_conditions_acceptance_repository
			.upsert(&terms_and_conditions_acceptance)?;

		Ok(())
	}
}
