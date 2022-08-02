use crate::domain::*;
use mockall::automock;
use std::sync::Arc;

#[automock]
// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be `Send` and `Sync`
pub trait Usecase: Send + Sync {
	fn send_assign_request(
		&self,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Result<()>;
}

pub struct AssignContribution {
	contribution_service: Arc<dyn ContributionService>,
	contribution_repository: Arc<dyn ContributionRepository>,
}

impl AssignContribution {
	pub fn new_usecase(
		contribution_service: Arc<dyn ContributionService>,
		contribution_repository: Arc<dyn ContributionRepository>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			contribution_service,
			contribution_repository,
		})
	}
}

impl Usecase for AssignContribution {
	fn send_assign_request(
		&self,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Result<()> {
		match self.contribution_repository.find_by_id(contribution_id)? {
			Some(contribution) => self
				.contribution_service
				.assign_contributor(contribution.onchain_id, contributor_id),
			None => Err(Error::InvalidContribution(String::from(
				"Contribution does not exist",
			))),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;
	use starknet::core::types::FieldElement;

	#[fixture]
	fn contribution_service() -> MockContributionService {
		MockContributionService::new()
	}

	#[fixture]
	fn contribution_repository() -> MockContributionRepository {
		MockContributionRepository::new()
	}

	#[rstest]
	fn assign_contribution_success(
		mut contribution_service: MockContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository
			.expect_find_by_id()
			.with(eq(ContributionId::from_u128(12)))
			.returning(|_| {
				Ok(Some(Contribution {
					id: ContributionId::from_u128(12),
					onchain_id: String::from("22"),
					project_id: String::from("34"),
					contributor_id: None,
					title: None,
					description: None,
					status: ContributionStatus::Open,
					external_link: None,
					gate: 0,
					metadata: ContributionMetadata {
						difficulty: None,
						technology: None,
						duration: None,
						context: None,
						r#type: None,
					},
					validator: FieldElement::ZERO,
				}))
			});

		contribution_service
			.expect_assign_contributor()
			.with(eq(String::from("22")), eq(ContributorId::from(34)))
			.returning(|_, _| Ok(()));

		let usecase = AssignContribution::new_usecase(
			Arc::new(contribution_service),
			Arc::new(contribution_repository),
		);

		let result =
			usecase.send_assign_request(ContributionId::from_u128(12), ContributorId::from(34));
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	fn assign_contribution_find_error(
		contribution_service: MockContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository
			.expect_find_by_id()
			.returning(|_| Err(Error::InvalidContribution(String::new())));

		let usecase = AssignContribution::new_usecase(
			Arc::new(contribution_service),
			Arc::new(contribution_repository),
		);

		let result =
			usecase.send_assign_request(ContributionId::from_u128(12), ContributorId::from(34));

		assert!(result.is_err());
		assert_eq!(
			Error::InvalidContribution(String::new()),
			result.unwrap_err(),
		);
	}

	#[rstest]
	fn assign_contribution_not_found(
		contribution_service: MockContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository.expect_find_by_id().returning(|_| Ok(None));

		let usecase = AssignContribution::new_usecase(
			Arc::new(contribution_service),
			Arc::new(contribution_repository),
		);

		let result =
			usecase.send_assign_request(ContributionId::from_u128(12), ContributorId::from(34));

		assert!(result.is_err());
		assert_eq!(
			Error::InvalidContribution(String::from("Contribution does not exist")),
			result.unwrap_err(),
		);
	}

	#[rstest]
	fn assign_contribution_send_error(
		mut contribution_service: MockContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository
			.expect_find_by_id()
			.with(eq(ContributionId::from_u128(12)))
			.returning(|_| {
				Ok(Some(Contribution {
					id: ContributionId::from_u128(12),
					onchain_id: String::from("22"),
					project_id: String::from("34"),
					contributor_id: None,
					title: None,
					description: None,
					status: ContributionStatus::Open,
					external_link: None,
					gate: 0,
					metadata: ContributionMetadata {
						difficulty: None,
						technology: None,
						duration: None,
						context: None,
						r#type: None,
					},
					validator: FieldElement::ZERO,
				}))
			});

		contribution_service
			.expect_assign_contributor()
			.with(eq(String::from("22")), eq(ContributorId::from(34)))
			.returning(|_, _| Err(Error::TransactionRevertedError(String::new())));

		let usecase = AssignContribution::new_usecase(
			Arc::new(contribution_service),
			Arc::new(contribution_repository),
		);

		let result =
			usecase.send_assign_request(ContributionId::from_u128(12), ContributorId::from(34));

		assert!(result.is_err());
		assert_eq!(
			Error::TransactionRevertedError(String::new()),
			result.unwrap_err(),
		);
	}
}
