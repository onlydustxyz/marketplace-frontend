use async_trait::async_trait;
use mapinto::ResultMapErrInto;
use marketplace_domain::{Error as DomainError, *};
use mockall::automock;
use std::sync::Arc;

#[automock]
#[async_trait]
pub trait Usecase: Send + Sync {
	async fn send_creation_request(
		&self,
		contribution: ContributionProjection,
	) -> Result<HexPrefixedString, DomainError>;
}

pub struct CreateContribution {
	onchain_contribution_service: Arc<dyn OnchainContributionService>,
}

impl CreateContribution {
	pub fn new_usecase_boxed(
		onchain_contribution_service: Arc<dyn OnchainContributionService>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			onchain_contribution_service,
		})
	}
}

#[async_trait]
impl Usecase for CreateContribution {
	async fn send_creation_request(
		&self,
		contribution: ContributionProjection,
	) -> Result<HexPrefixedString, DomainError> {
		self.onchain_contribution_service.create(contribution).await.map_err_into()
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use futures::FutureExt;
	use mockall::predicate::*;
	use thiserror::Error;

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	#[tokio::test]
	async fn forward_request() {
		let mut onchain_contribution_service = MockOnchainContributionService::new();

		let contribution = ContributionProjection::default();

		onchain_contribution_service
			.expect_create()
			.with(eq(contribution.clone()))
			.returning(|_| async { Ok(HexPrefixedString::default()) }.boxed());

		let usecase = CreateContribution::new_usecase_boxed(Arc::new(onchain_contribution_service));

		let result = usecase.send_creation_request(contribution).await;
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[tokio::test]
	async fn forward_request_error() {
		let mut onchain_contribution_service = MockOnchainContributionService::new();

		let contribution = ContributionProjection::default();

		onchain_contribution_service.expect_create().returning(|_| {
			async {
				Err(OnchainContributionServiceError::Infrastructure(Box::new(
					Error,
				)))
			}
			.boxed()
		});

		let usecase = CreateContribution::new_usecase_boxed(Arc::new(onchain_contribution_service));

		let result = usecase.send_creation_request(contribution).await;
		assert!(result.is_err());
		assert_eq!(
			"Onchain contribution service error",
			result.unwrap_err().to_string()
		);
	}
}
