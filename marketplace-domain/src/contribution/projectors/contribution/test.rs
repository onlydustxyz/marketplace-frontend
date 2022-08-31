use super::ContributionProjector;
use crate::*;
use mockall::predicate::*;
use rstest::*;
use std::sync::Arc;

#[fixture]
fn contribution_projection_repository() -> MockContributionProjectionRepository {
	MockContributionProjectionRepository::new()
}

#[fixture]
fn github_issue_repository() -> MockGithubIssueRepository {
	MockGithubIssueRepository::new()
}

#[fixture]
fn contribution_id() -> ContributionId {
	ContributionId::from(123)
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
fn gate() -> u8 {
	2
}

#[fixture]
fn contribution(
	contribution_id: ContributionId,
	project_id: GithubProjectId,
	gate: u8,
	github_issue: GithubIssue,
	issue_number: GithubIssueNumber,
) -> ContributionProjection {
	ContributionProjection {
		id: contribution_id,
		project_id,
		issue_number,
		gate,
		contributor_id: None,
		status: ContributionStatus::Open,
		title: Some(github_issue.title),
		description: github_issue.description,
		external_link: Some(github_issue.external_link),
		metadata: ContributionProjectionMetadata {
			difficulty: github_issue.difficulty,
			technology: github_issue.technology,
			duration: github_issue.duration,
			context: github_issue.context,
			r#type: github_issue.r#type,
		},
	}
}

#[fixture]
fn contribution_created_event(
	contribution_id: ContributionId,
	project_id: GithubProjectId,
	issue_number: GithubIssueNumber,
	gate: u8,
) -> ContributionEvent {
	ContributionEvent::Created {
		id: contribution_id,
		project_id,
		issue_number,
		gate,
	}
}

#[fixture]
fn contribution_assigned_event(
	contribution_id: ContributionId,
	contributor_id: ContributorId,
) -> ContributionEvent {
	ContributionEvent::Assigned {
		id: contribution_id,
		contributor_id,
	}
}

#[fixture]
fn contribution_unassigned_event(contribution_id: ContributionId) -> ContributionEvent {
	ContributionEvent::Unassigned {
		id: contribution_id,
	}
}

#[fixture]
fn contribution_validated_event(contribution_id: ContributionId) -> ContributionEvent {
	ContributionEvent::Validated {
		id: contribution_id,
	}
}

#[rstest]
async fn on_contribution_created_event(
	mut contribution_projection_repository: MockContributionProjectionRepository,
	mut github_issue_repository: MockGithubIssueRepository,
	project_id: GithubProjectId,
	issue_number: GithubIssueNumber,
	github_issue: GithubIssue,
	contribution: ContributionProjection,
	contribution_created_event: ContributionEvent,
) {
	github_issue_repository
		.expect_find()
		.with(eq(project_id), eq(issue_number))
		.returning(move |_, _| Ok(Some(github_issue.clone())));

	contribution_projection_repository
		.expect_create()
		.with(eq(contribution))
		.returning(|_| Ok(()));

	let projector = ContributionProjector::new(
		Arc::new(contribution_projection_repository),
		Arc::new(github_issue_repository),
	);

	projector.project(&contribution_created_event);
}

#[rstest]
fn on_contribution_assigned_event(
	mut contribution_projection_repository: MockContributionProjectionRepository,
	github_issue_repository: MockGithubIssueRepository,
	contributor_id: ContributorId,
	contribution_id: ContributionId,
	contribution_assigned_event: ContributionEvent,
) {
	contribution_projection_repository
		.expect_update_contributor_and_status()
		.with(
			eq(contribution_id),
			eq(Some(contributor_id)),
			eq(ContributionStatus::Assigned),
		)
		.returning(|_, _, _| Ok(()));

	let projector = ContributionProjector::new(
		Arc::new(contribution_projection_repository),
		Arc::new(github_issue_repository),
	);

	projector.project(&contribution_assigned_event);
}

#[rstest]
fn on_contribution_unassigned_event(
	mut contribution_projection_repository: MockContributionProjectionRepository,
	github_issue_repository: MockGithubIssueRepository,
	contribution_id: ContributionId,
	contribution_unassigned_event: ContributionEvent,
) {
	contribution_projection_repository
		.expect_update_status()
		.with(eq(contribution_id), eq(ContributionStatus::Open))
		.returning(|_, _| Ok(()));

	let projector = ContributionProjector::new(
		Arc::new(contribution_projection_repository),
		Arc::new(github_issue_repository),
	);

	projector.project(&contribution_unassigned_event);
}

#[rstest]
fn on_contribution_validated_event(
	mut contribution_projection_repository: MockContributionProjectionRepository,
	github_issue_repository: MockGithubIssueRepository,
	contribution_id: ContributionId,
	contribution_validated_event: ContributionEvent,
) {
	contribution_projection_repository
		.expect_update_status()
		.with(eq(contribution_id), eq(ContributionStatus::Completed))
		.returning(|_, _| Ok(()));

	let projector = ContributionProjector::new(
		Arc::new(contribution_projection_repository),
		Arc::new(github_issue_repository),
	);

	projector.project(&contribution_validated_event);
}
