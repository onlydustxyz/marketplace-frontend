use mapinto::ResultMapErrInto;
use mockall::automock;
use onlydust_domain::{Error as DomainError, *};
use std::sync::Arc;

#[automock]
pub trait Usecase: Send + Sync {
	fn send_creation_request(&self, contribution: Contribution) -> Result<(), DomainError>;
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

impl Usecase for CreateContribution {
	fn send_creation_request(&self, contribution: Contribution) -> Result<(), DomainError> {
		self.onchain_contribution_service.create(contribution).map_err_into()
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use thiserror::Error;

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	#[test]
	fn forward_request() {
		let mut onchain_contribution_service = MockOnchainContributionService::new();

		let contribution = Contribution::default();

		onchain_contribution_service
			.expect_create()
			.with(eq(contribution.clone()))
			.returning(|_| Ok(()));

		let usecase = CreateContribution::new_usecase_boxed(Arc::new(onchain_contribution_service));

		let result = usecase.send_creation_request(contribution);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[test]
	fn forward_request_error() {
		let mut onchain_contribution_service = MockOnchainContributionService::new();

		let contribution = Contribution::default();

		onchain_contribution_service.expect_create().returning(|_| {
			Err(OnchainContributionServiceError::Infrastructure(Box::new(
				Error,
			)))
		});

		let usecase = CreateContribution::new_usecase_boxed(Arc::new(onchain_contribution_service));

		let result = usecase.send_creation_request(contribution);
		assert!(result.is_err());
		assert_eq!(
			"Onchain contribution service error",
			result.unwrap_err().to_string()
		);
	}
}
