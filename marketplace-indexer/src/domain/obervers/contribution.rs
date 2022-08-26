use super::*;
use futures::executor::block_on;
use log::error;
use marketplace_domain::ContributionService;
use std::sync::Arc;

pub struct ContributionObserver {
	contribution_repository: Arc<dyn ContributionRepository>,
	contribution_service: Arc<dyn ContributionService>,
}

impl ContributionObserver {
	pub fn new(
		contribution_repository: Arc<dyn ContributionRepository>,
		contribution_service: Arc<dyn ContributionService>,
	) -> Self {
		Self {
			contribution_repository,
			contribution_service,
		}
	}
}

impl Observer for ContributionObserver {
	fn on_connect(&self, _indexer_id: &IndexerId) {}

	fn on_new_event(&self, event: &Event) {
		match event {
			Event::Contribution(event) => match event {
				ContributionEvent::Created {
					id,
					project_id,
					issue_number,
					gate,
				} => {
					if let Err(error) = block_on(self.contribution_service.create(
						id,
						project_id,
						issue_number,
						*gate,
					)) {
						error!(
							"Error when trying to update Contribution table from event Created: {error}"
						);
					}
				},

				ContributionEvent::Assigned { id, contributor_id } => {
					if let Err(error) = self.contribution_repository.update_contributor_and_status(
						id.to_string(),
						Some(contributor_id.to_owned()),
						ContributionStatus::Assigned,
						Default::default(),
					) {
						error!(
							"Error when trying to update Contribution table from event Assigned: {error}"
						);
					}
				},

				ContributionEvent::Unassigned { id } => {
					if let Err(error) = self.contribution_repository.update_status(
						id.to_string(),
						ContributionStatus::Open,
						Default::default(),
					) {
						error!(
							"Error when trying to update Contribution table from event Unassigned: {error}"
						);
					}
				},

				ContributionEvent::Validated { id } => {
					if let Err(error) = self.contribution_repository.update_status(
						id.to_string(),
						ContributionStatus::Completed,
						Default::default(),
					) {
						error!(
							"Error when trying to update Contribution table from event Validated: {error}"
						);
					}
				},
			},
		}
	}

	fn on_new_block(&self, _block_hash: &BlockHash) {}

	fn on_reorg(&self) {}
}

#[cfg(test)]
mod test {
	use super::*;
	use marketplace_domain::contribution::Id as ContributionId;
	use mockall::predicate::*;
	use rstest::*;
	use std::str::FromStr;

	#[fixture]
	fn indexer_id() -> IndexerId {
		Default::default()
	}

	#[fixture]
	fn contribution_id() -> ContributionId {
		ContributionId::from_str("0x1234").unwrap()
	}

	#[fixture]
	fn contributor_id() -> ContributorId {
		ContributorId::from_str("0x42").unwrap()
	}

	#[fixture]
	fn project_id() -> GithubProjectId {
		666
	}

	#[fixture]
	fn issue_number() -> GithubIssueNumber {
		42
	}

	#[fixture]
	fn gate() -> u8 {
		2
	}

	#[fixture]
	fn block_hash() -> BlockHash {
		Default::default()
	}

	#[fixture]
	fn contribution_created_event(
		contribution_id: ContributionId,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		gate: u8,
	) -> Event {
		Event::Contribution(ContributionEvent::Created {
			id: contribution_id,
			project_id,
			issue_number,
			gate,
		})
	}

	#[fixture]
	fn contribution_assigned_event(
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Event {
		Event::Contribution(ContributionEvent::Assigned {
			id: contribution_id,
			contributor_id,
		})
	}

	#[fixture]
	fn contribution_unassigned_event(contribution_id: ContributionId) -> Event {
		Event::Contribution(ContributionEvent::Unassigned {
			id: contribution_id,
		})
	}

	#[fixture]
	fn contribution_validated_event(contribution_id: ContributionId) -> Event {
		Event::Contribution(ContributionEvent::Validated {
			id: contribution_id,
		})
	}

	#[fixture]
	fn contribution_repository() -> MockContributionRepository {
		MockContributionRepository::new()
	}

	#[fixture]
	fn contribution_service() -> MockContributionService {
		MockContributionService::new()
	}

	#[fixture]
	fn observer(
		contribution_repository: MockContributionRepository,
		contribution_service: MockContributionService,
	) -> ContributionObserver {
		ContributionObserver::new(
			Arc::new(contribution_repository),
			Arc::new(contribution_service),
		)
	}

	#[rstest]
	fn on_contribution_created_event(
		mut contribution_service: MockContributionService,
		contribution_repository: MockContributionRepository,
		contribution_id: ContributionId,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		gate: u8,
		contribution_created_event: Event,
	) {
		contribution_service
			.expect_create()
			.with(
				eq(contribution_id),
				eq(project_id),
				eq(issue_number),
				eq(gate),
			)
			.returning(|_, _, _, _| Ok(()));

		let observer = ContributionObserver::new(
			Arc::new(contribution_repository),
			Arc::new(contribution_service),
		);
		observer.on_new_event(&contribution_created_event)
	}

	#[rstest]
	fn on_contribution_assigned_event(
		contribution_service: MockContributionService,
		mut contribution_repository: MockContributionRepository,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
		contribution_assigned_event: Event,
	) {
		contribution_repository
			.expect_update_contributor_and_status()
			.with(
				eq(contribution_id.to_string()),
				eq(Some(contributor_id)),
				eq(ContributionStatus::Assigned),
				always(),
			)
			.returning(|_, _, _, _| Ok(()));

		let observer = ContributionObserver::new(
			Arc::new(contribution_repository),
			Arc::new(contribution_service),
		);
		observer.on_new_event(&contribution_assigned_event)
	}

	#[rstest]
	fn on_contribution_unassigned_event(
		contribution_service: MockContributionService,
		mut contribution_repository: MockContributionRepository,
		contribution_id: ContributionId,
		contribution_unassigned_event: Event,
	) {
		contribution_repository
			.expect_update_status()
			.with(
				eq(contribution_id.to_string()),
				eq(ContributionStatus::Open),
				always(),
			)
			.returning(|_, _, _| Ok(()));

		let observer = ContributionObserver::new(
			Arc::new(contribution_repository),
			Arc::new(contribution_service),
		);
		observer.on_new_event(&contribution_unassigned_event)
	}

	#[rstest]
	fn on_contribution_validated_event(
		contribution_service: MockContributionService,
		mut contribution_repository: MockContributionRepository,
		contribution_id: ContributionId,
		contribution_validated_event: Event,
	) {
		contribution_repository
			.expect_update_status()
			.with(
				eq(contribution_id.to_string()),
				eq(ContributionStatus::Completed),
				always(),
			)
			.returning(|_, _, _| Ok(()));

		let observer = ContributionObserver::new(
			Arc::new(contribution_repository),
			Arc::new(contribution_service),
		);
		observer.on_new_event(&contribution_validated_event)
	}

	#[rstest]
	#[case(contribution_created_event(
		Default::default(),
		Default::default(),
		Default::default(),
		Default::default()
	))]
	#[case(contribution_assigned_event(Default::default(), Default::default()))]
	#[case(contribution_unassigned_event(Default::default()))]
	#[case(contribution_validated_event(Default::default()))]
	fn should_not_panick_on_error(
		mut contribution_service: MockContributionService,
		mut contribution_repository: MockContributionRepository,
		#[case] event: Event,
	) {
		contribution_service.expect_create().returning(|_, _, _, _| {
			Err(marketplace_domain::Error::ContributionRepository(
				ContributionRepositoryError::NotFound,
			))
		});

		contribution_repository
			.expect_update_contributor_and_status()
			.returning(|_, _, _, _| Err(ContributionRepositoryError::NotFound));

		contribution_repository
			.expect_update_status()
			.returning(|_, _, _| Err(ContributionRepositoryError::NotFound));

		let observer = ContributionObserver::new(
			Arc::new(contribution_repository),
			Arc::new(contribution_service),
		);
		observer.on_new_event(&event)
	}

	#[rstest]
	fn on_connect(observer: ContributionObserver, indexer_id: IndexerId) {
		observer.on_connect(&indexer_id);
	}

	#[rstest]
	fn on_new_block(observer: ContributionObserver, block_hash: BlockHash) {
		observer.on_new_block(&block_hash);
	}

	#[rstest]
	fn on_reorg(observer: ContributionObserver) {
		observer.on_reorg();
	}
}
