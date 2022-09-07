use std::sync::Arc;

use super::*;
use crate::*;
use mockall::predicate::eq;
use rstest::*;

#[fixture]
fn member_projection_repository() -> MockProjectMemberProjectionRepository {
	MockProjectMemberProjectionRepository::new()
}

#[fixture]
fn project_id() -> ProjectId {
	1324
}

#[fixture]
fn contributor_id() -> ContributorId {
	"0x5632".parse().unwrap()
}

#[fixture]
fn on_member_added_event(project_id: ProjectId, contributor_id: ContributorId) -> ProjectEvent {
	ProjectEvent::MemberAdded {
		project_id,
		contributor_id,
	}
}

#[fixture]
fn on_member_removed_event(project_id: ProjectId, contributor_id: ContributorId) -> ProjectEvent {
	ProjectEvent::MemberRemoved {
		project_id,
		contributor_id,
	}
}

#[fixture]
fn on_lead_contributor_added_event(
	project_id: ProjectId,
	contributor_id: ContributorId,
) -> ProjectEvent {
	ProjectEvent::LeadContributorAdded {
		project_id,
		contributor_id,
	}
}

#[fixture]
fn on_lead_contributor_removed_event(
	project_id: ProjectId,
	contributor_id: ContributorId,
) -> ProjectEvent {
	ProjectEvent::LeadContributorRemoved {
		project_id,
		contributor_id,
	}
}

#[rstest]
#[case(on_member_added_event(project_id(), contributor_id()), false)]
#[case(on_lead_contributor_added_event(project_id(), contributor_id()), true)]
async fn on_member_added(
	mut member_projection_repository: MockProjectMemberProjectionRepository,
	#[case] event: ProjectEvent,
	project_id: ProjectId,
	contributor_id: ContributorId,
	#[case] is_lead_contributor: bool,
) {
	member_projection_repository
		.expect_store()
		.with(eq(ProjectMemberProjection::new(
			project_id,
			contributor_id,
			is_lead_contributor,
		)))
		.times(1)
		.returning(|_| Ok(()));

	let projector = MemberProjector::new(Arc::new(member_projection_repository));
	projector.project(&event).await;
}

#[rstest]
#[case(on_member_removed_event(project_id(), contributor_id()))]
#[case(on_lead_contributor_removed_event(project_id(), contributor_id()))]
async fn on_member_removed(
	mut member_projection_repository: MockProjectMemberProjectionRepository,
	#[case] event: ProjectEvent,
	project_id: ProjectId,
	contributor_id: ContributorId,
) {
	member_projection_repository
		.expect_delete()
		.with(eq(project_id), eq(contributor_id))
		.times(1)
		.returning(|_, _| Ok(()));

	let projector = MemberProjector::new(Arc::new(member_projection_repository));
	projector.project(&event).await;
}
