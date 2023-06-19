use std::sync::Arc;

use chrono::Utc;
use domain::UserId;
use infrastructure::database::{DatabaseError, Repository};
use thiserror::Error;

use crate::models::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to update terms and conditions acceptance")]
	Repository(#[from] DatabaseError),
}

type Result<T> = std::result::Result<T, Error>;

pub struct Usecase {
	terms_and_conditions_acceptance_repository: Arc<dyn Repository<TermsAndConditionsAcceptance>>,
}

impl Usecase {
	pub fn new(
		terms_and_conditions_acceptance_repository: Arc<
			dyn Repository<TermsAndConditionsAcceptance>,
		>,
	) -> Self {
		Self {
			terms_and_conditions_acceptance_repository,
		}
	}

	pub async fn accept_terms_and_conditions(&self, caller_id: UserId) -> Result<()> {
		self.terms_and_conditions_acceptance_repository
			.upsert(TermsAndConditionsAcceptance {
				user_id: caller_id,
				acceptance_date: Utc::now().naive_utc(),
			})?;

		Ok(())
	}
}
