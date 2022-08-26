use super::WithGithubDataProjection;
use crate::*;
use mockall::predicate::*;
use rstest::*;
use std::{str::FromStr, sync::Arc};
use uuid::Uuid;

#[fixture]
fn contribution_repository() -> MockContributionRepository {
	MockContributionRepository::new()
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
fn contribution_onchain_id() -> ContributionAggregateId {
	"0x123".parse().unwrap()
}

#[fixture]
fn gate() -> u8 {
	2
}

#[fixture]
fn contribution(
	contribution_id: ContributionId,
	contribution_onchain_id: ContributionAggregateId,
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

#[fixture]
fn contribution_created_event(
	contribution_onchain_id: ContributionAggregateId,
	project_id: GithubProjectId,
	issue_number: GithubIssueNumber,
	gate: u8,
) -> ContributionEvent {
	ContributionEvent::Created {
		id: contribution_onchain_id,
		project_id,
		issue_number,
		gate,
	}
}

#[fixture]
fn contribution_assigned_event(
	contribution_onchain_id: ContributionAggregateId,
	contributor_id: ContributorId,
) -> ContributionEvent {
	ContributionEvent::Assigned {
		id: contribution_onchain_id,
		contributor_id,
	}
}

#[fixture]
fn contribution_unassigned_event(
	contribution_onchain_id: ContributionAggregateId,
) -> ContributionEvent {
	ContributionEvent::Unassigned {
		id: contribution_onchain_id,
	}
}

#[fixture]
fn contribution_validated_event(
	contribution_onchain_id: ContributionAggregateId,
) -> ContributionEvent {
	ContributionEvent::Validated {
		id: contribution_onchain_id,
	}
}

#[rstest]
async fn on_contribution_created_event(
	mut contribution_repository: MockContributionRepository,
	mut github_issue_repository: MockGithubIssueRepository,
	mut uuid_generator: MockUuidGenerator,
	project_id: GithubProjectId,
	issue_number: GithubIssueNumber,
	github_issue: GithubIssue,
	contribution: Contribution,
	contribution_id: ContributionId,
	contribution_created_event: ContributionEvent,
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

	let projection = WithGithubDataProjection::new(
		Arc::new(contribution_repository),
		Arc::new(uuid_generator),
		Arc::new(github_issue_repository),
	);

	projection.project(&contribution_created_event);
}

#[rstest]
fn on_contribution_assigned_event(
	mut contribution_repository: MockContributionRepository,
	github_issue_repository: MockGithubIssueRepository,
	uuid_generator: MockUuidGenerator,
	contributor_id: ContributorId,
	contribution_onchain_id: ContributionAggregateId,
	contribution_assigned_event: ContributionEvent,
) {
	contribution_repository
		.expect_update_contributor_and_status()
		.with(
			eq(contribution_onchain_id.to_string()),
			eq(Some(contributor_id)),
			eq(ContributionStatus::Assigned),
			always(),
		)
		.returning(|_, _, _, _| Ok(()));

	let projection = WithGithubDataProjection::new(
		Arc::new(contribution_repository),
		Arc::new(uuid_generator),
		Arc::new(github_issue_repository),
	);

	projection.project(&contribution_assigned_event);
}

#[rstest]
fn on_contribution_unassigned_event(
	mut contribution_repository: MockContributionRepository,
	github_issue_repository: MockGithubIssueRepository,
	uuid_generator: MockUuidGenerator,
	contribution_onchain_id: ContributionAggregateId,
	contribution_unassigned_event: ContributionEvent,
) {
	contribution_repository
		.expect_update_status()
		.with(
			eq(contribution_onchain_id.to_string()),
			eq(ContributionStatus::Open),
			always(),
		)
		.returning(|_, _, _| Ok(()));

	let projection = WithGithubDataProjection::new(
		Arc::new(contribution_repository),
		Arc::new(uuid_generator),
		Arc::new(github_issue_repository),
	);

	projection.project(&contribution_unassigned_event);
}

#[rstest]
fn on_contribution_validated_event(
	mut contribution_repository: MockContributionRepository,
	github_issue_repository: MockGithubIssueRepository,
	uuid_generator: MockUuidGenerator,
	contribution_onchain_id: ContributionAggregateId,
	contribution_validated_event: ContributionEvent,
) {
	contribution_repository
		.expect_update_status()
		.with(
			eq(contribution_onchain_id.to_string()),
			eq(ContributionStatus::Completed),
			always(),
		)
		.returning(|_, _, _| Ok(()));

	let projection = WithGithubDataProjection::new(
		Arc::new(contribution_repository),
		Arc::new(uuid_generator),
		Arc::new(github_issue_repository),
	);

	projection.project(&contribution_validated_event);
}
