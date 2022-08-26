use crate::*;
use async_trait::async_trait;
use log::error;
use mapinto::ResultMapErrInto;
use mockall::automock;
use std::sync::{Arc, RwLock};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(
		"The current contribution status, `{0}`, does not allow it to recieve new applications"
	)]
	CannotApply(ContributionStatus),
}

#[automock]
#[async_trait]
pub trait Service: Send + Sync {
	async fn create(
		&self,
		id: &contribution::Id,
		project_id: &GithubProjectId,
		issue_number: &GithubIssueNumber,
		gate: u8,
	) -> Result<(), DomainError>;

	fn apply(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct ContributionService {
	contribution_repository: Arc<dyn ContributionRepository>,
	application_repository: Arc<dyn ApplicationRepository>,
	uuid_generator: Arc<RwLock<dyn UuidGenerator>>,
	github_issue_repository: Arc<dyn GithubIssueRepository>,
}

impl ContributionService {
	pub fn new(
		contribution_repository: Arc<dyn ContributionRepository>,
		application_repository: Arc<dyn ApplicationRepository>,
		uuid_generator: Arc<RwLock<dyn UuidGenerator>>,
		github_issue_repository: Arc<dyn GithubIssueRepository>,
	) -> Self {
		Self {
			application_repository,
			contribution_repository,
			uuid_generator,
			github_issue_repository,
		}
	}
}

#[async_trait]
impl Service for ContributionService {
	async fn create(
		&self,
		id: &contribution::Id,
		project_id: &GithubProjectId,
		issue_number: &GithubIssueNumber,
		gate: u8,
	) -> Result<(), DomainError> {
		let issue = match self.github_issue_repository.find(project_id, issue_number).await {
			Ok(Some(issue)) => Some(issue),

			Ok(None) => {
				error!("GitHub issue not found: {project_id}/{issue_number}");
				None
			},

			Err(e) => {
				error!(
					"Error while fetching GitHub issue {project_id}/{issue_number}: {}",
					e.to_string()
				);
				None
			},
		};

		let uuid = self.uuid_generator.write().map_err(|_| DomainError::Lock)?.new_uuid();

		let contribution = Contribution {
			id: uuid.into(),
			onchain_id: id.to_string(),
			project_id: project_id.to_string(),
			contributor_id: None,
			status: ContributionStatus::Open,
			gate,
			title: issue.clone().map(|issue| issue.title),
			description: issue.clone().and_then(|issue| issue.description),
			external_link: issue.clone().map(|issue| issue.external_link),
			metadata: ContributionMetadata {
				difficulty: issue.clone().and_then(|issue| issue.difficulty),
				technology: issue.clone().and_then(|issue| issue.technology),
				duration: issue.clone().and_then(|issue| issue.duration),
				context: issue.clone().and_then(|issue| issue.context),
				r#type: issue.and_then(|issue| issue.r#type),
			},
			..Default::default()
		};

		self.contribution_repository
			.create(contribution, Default::default())
			.map_err_into()
	}

	fn apply(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		let contribution = self
			.contribution_repository
			.find_by_id(contribution_id)
			.map_err(DomainError::from)?
			.ok_or_else(|| DomainError::from(ContributionRepositoryError::NotFound))?;

		if contribution.status != ContributionStatus::Open {
			return Err(Error::CannotApply(contribution.status).into());
		}

		let uuid = self.uuid_generator.write().map_err(|_| DomainError::Lock)?.new_uuid();

		let application = Application::new(
			uuid.into(),
			*contribution_id,
			contributor_id.clone(),
			ApplicationStatus::Pending,
		);

		self.application_repository.create(application).map_err_into()
	}
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use super::*;
	use crate::MockGithubIssueRepository;
	use mockall::predicate::{always, eq};
	use rstest::*;
	use uuid::Uuid;

	#[fixture]
	fn contribution_repository() -> MockContributionRepository {
		MockContributionRepository::new()
	}

	#[fixture]
	fn application_repository() -> MockApplicationRepository {
		MockApplicationRepository::new()
	}

	#[fixture]
	fn uuid_generator() -> MockUuidGenerator {
		MockUuidGenerator::new()
	}

	#[fixture]
	fn github_issue_repository() -> MockGithubIssueRepository {
		MockGithubIssueRepository::new()
	}

	#[fixture]
	fn contribution_id() -> ContributionId {
		Uuid::from_str("c5ac070d-3478-4973-be8e-756aada6bcf8").unwrap().into()
	}

	#[fixture]
	fn contributor_id() -> ContributorId {
		123.into()
	}

	#[fixture]
	fn application_id() -> ApplicationId {
		Uuid::new_v4().into()
	}

	#[fixture]
	fn project_id() -> GithubProjectId {
		123456
	}

	#[fixture]
	fn issue_number() -> GithubIssueNumber {
		654321
	}

	#[fixture]
	fn github_issue(project_id: GithubProjectId, issue_number: GithubIssueNumber) -> GithubIssue {
		GithubIssue {
			project_id,
			number: issue_number,
			..Default::default()
		}
	}

	#[fixture]
	fn contribution_onchain_id() -> crate::contribution::Id {
		"0x123".parse().unwrap()
	}

	#[fixture]
	fn gate() -> u8 {
		2
	}

	#[fixture]
	fn contribution(
		contribution_id: ContributionId,
		contribution_onchain_id: crate::contribution::Id,
		project_id: GithubProjectId,
		gate: u8,
		github_issue: GithubIssue,
	) -> Contribution {
		Contribution {
			id: contribution_id,
			onchain_id: contribution_onchain_id.to_string(),
			project_id: project_id.to_string(),
			gate,
			contributor_id: None,
			status: ContributionStatus::Open,
			title: Some(github_issue.title),
			description: github_issue.description,
			external_link: Some(github_issue.external_link),
			metadata: ContributionMetadata {
				difficulty: github_issue.difficulty,
				technology: github_issue.technology,
				duration: github_issue.duration,
				context: github_issue.context,
				r#type: github_issue.r#type,
			},
			..Default::default()
		}
	}

	#[rstest]
	#[async_std::test]
	async fn can_create_a_contribution(
		mut contribution_repository: MockContributionRepository,
		mut github_issue_repository: MockGithubIssueRepository,
		application_repository: MockApplicationRepository,
		mut uuid_generator: MockUuidGenerator,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		github_issue: GithubIssue,
		contribution: Contribution,
		contribution_onchain_id: crate::contribution::Id,
		gate: u8,
		contribution_id: ContributionId,
	) {
		github_issue_repository
			.expect_find()
			.with(eq(project_id), eq(issue_number))
			.returning(move |_, _| Ok(Some(github_issue.clone())));

		contribution_repository
			.expect_create()
			.with(eq(contribution), always())
			.returning(|_, _| Ok(()));

		uuid_generator.expect_new_uuid().returning(move || contribution_id.into());

		let contribution_service = ContributionService {
			contribution_repository: Arc::new(contribution_repository),
			application_repository: Arc::new(application_repository),
			uuid_generator: Arc::new(RwLock::new(uuid_generator)),
			github_issue_repository: Arc::new(github_issue_repository),
		};

		let result = contribution_service
			.create(&contribution_onchain_id, &project_id, &issue_number, gate)
			.await;

		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	fn application_success(
		mut contribution_repository: MockContributionRepository,
		mut application_repository: MockApplicationRepository,
		mut uuid_generator: MockUuidGenerator,
		github_issue_repository: MockGithubIssueRepository,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
		application_id: ApplicationId,
	) {
		uuid_generator.expect_new_uuid().return_const(application_id);
		contribution_repository.expect_find_by_id().with(eq(contribution_id)).returning(
			move |_| {
				Ok(Some(Contribution {
					id: contribution_id,
					status: ContributionStatus::Open,
					..Default::default()
				}))
			},
		);
		application_repository
			.expect_create()
			.withf(move |application| *application.id() == application_id)
			.returning(move |_| Ok(()));

		let contribution_service = ContributionService {
			contribution_repository: Arc::new(contribution_repository),
			application_repository: Arc::new(application_repository),
			uuid_generator: Arc::new(RwLock::new(uuid_generator)),
			github_issue_repository: Arc::new(github_issue_repository),
		};

		let apply_result = contribution_service.apply(&contribution_id, &contributor_id);
		assert!(apply_result.is_ok());
	}

	#[rstest]
	fn contribution_must_be_open(
		mut contribution_repository: MockContributionRepository,
		github_issue_repository: MockGithubIssueRepository,
		application_repository: MockApplicationRepository,
		uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) {
		contribution_repository.expect_find_by_id().with(eq(contribution_id)).returning(
			move |_| {
				Ok(Some(Contribution {
					id: contribution_id,
					status: ContributionStatus::Completed,
					..Default::default()
				}))
			},
		);

		let contribution_service = ContributionService {
			contribution_repository: Arc::new(contribution_repository),
			application_repository: Arc::new(application_repository),
			uuid_generator: Arc::new(RwLock::new(uuid_generator)),
			github_issue_repository: Arc::new(github_issue_repository),
		};

		let apply_result = contribution_service.apply(&contribution_id, &contributor_id);
		assert!(apply_result.is_err());
	}
}
