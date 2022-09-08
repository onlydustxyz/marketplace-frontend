use crate::starknet::{Account, Client, StarknetError};
use anyhow::anyhow;
use async_trait::async_trait;
use marketplace_domain::*;

#[async_trait]
impl<A: Account + Send + Sync + 'static> ContributorService for Client<A> {
	async fn contributor_by_id(
		&self,
		contributor_id: &ContributorId,
	) -> Result<Contributor, ContributorServiceError> {
		let account =
			self.profile.get_account(contributor_id).await.map_err(StarknetError::from)?;
		let contributor =
			self.registry.get_user_information(account).await.map_err(StarknetError::from)?;
		Ok(contributor)
	}
}

impl From<StarknetError> for ContributorServiceError {
	fn from(error: StarknetError) -> Self {
		match error {
			StarknetError::Contract(error) => Self::NotFound(anyhow!(error)),
			StarknetError::Mutex(error) => Self::Infrastructure(anyhow!(error)),
		}
	}
}
