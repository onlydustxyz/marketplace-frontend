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
fn contributor_account_address() -> ContributorAccountAddress {
	"0x5632".parse().unwrap()
}

#[fixture]
fn on_member_added_event(
	project_id: ProjectId,
	contributor_account_address: ContributorAccountAddress,
) -> Event {
	Event::Project(ProjectEvent::MemberAdded {
		project_id,
		contributor_account: contributor_account_address,
	})
}

#[fixture]
fn on_member_removed_event(
	project_id: ProjectId,
	contributor_account_address: ContributorAccountAddress,
) -> Event {
	Event::Project(ProjectEvent::MemberRemoved {
		project_id,
		contributor_account: contributor_account_address,
	})
}

#[rstest]
#[case(on_member_added_event(project_id(), contributor_account_address()))]
async fn on_member_added(
	mut member_projection_repository: MockProjectMemberProjectionRepository,
	#[case] event: Event,
	project_id: ProjectId,
	contributor_account_address: ContributorAccountAddress,
) {
	member_projection_repository
		.expect_insert()
		.with(eq(ProjectMemberProjection::new(
			project_id,
			contributor_account_address,
		)))
		.times(1)
		.returning(|_| Ok(()));

	let projector = MemberProjector::new(Arc::new(member_projection_repository));
	projector.on_event(&event).await;
}

#[rstest]
#[case(on_member_removed_event(project_id(), contributor_account_address()))]
async fn on_member_removed(
	mut member_projection_repository: MockProjectMemberProjectionRepository,
	#[case] event: Event,
	project_id: ProjectId,
	contributor_account_address: ContributorAccountAddress,
) {
	member_projection_repository
		.expect_delete()
		.with(eq(project_id), eq(contributor_account_address))
		.times(1)
		.returning(|_, _| Ok(()));

	let projector = MemberProjector::new(Arc::new(member_projection_repository));
	projector.on_event(&event).await;
}
