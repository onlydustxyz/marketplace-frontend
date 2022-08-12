use std::sync::Arc;

use crate::domain::*;
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

#[automock]
pub trait Service: Send + Sync {
	fn apply(
		&self,
		contribution_id: ContributionOnChainId,
		contributor_id: ContributorId,
	) -> Result<(), Error>;
}

pub struct ContributionService {
	onchain_contribution_service: Arc<dyn OnchainContributionService>,
	contribution_repository: Arc<dyn ContributionRepository>,
	application_repository: Arc<dyn ApplicationService>,
}

impl Service for ContributionService {
	fn apply(
		&self,
		contribution_id: ContributionOnChainId,
		contributor_id: ContributorId,
	) -> Result<(), Error> {
		Ok(())
	}
}
