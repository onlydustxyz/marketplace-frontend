use crate::*;
use async_trait::async_trait;
use log::error;
use std::sync::Arc;

pub struct MemberProjector {
	member_projection_repository: Arc<dyn ProjectMemberProjectionRepository>,
}

impl MemberProjector {
	pub fn new(member_projection_repository: Arc<dyn ProjectMemberProjectionRepository>) -> Self {
		Self {
			member_projection_repository,
		}
	}

	fn on_member_added(
		&self,
		project_id: &ProjectId,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<(), ProjectMemberProjectionRepositoryError> {
		self.member_projection_repository.upsert(ProjectMemberProjection::new(
			*project_id,
			contributor_account_address.clone(),
		))
	}

	fn on_member_removed(
		&self,
		project_id: &ProjectId,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<(), ProjectMemberProjectionRepositoryError> {
		self.member_projection_repository
			.delete(project_id, contributor_account_address)
	}
}

#[async_trait]
impl EventListener for MemberProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Project(project_event) => match project_event {
				ProjectEvent::MemberAdded {
					project_id,
					contributor_account: contributor_account_address,
				} => self.on_member_added(project_id, contributor_account_address),
				ProjectEvent::MemberRemoved {
					project_id,
					contributor_account: contributor_account_address,
				} => self.on_member_removed(project_id, contributor_account_address),
				ProjectEvent::LeadContributorAdded { .. }
				| ProjectEvent::LeadContributorRemoved { .. } => return,
			},
			Event::Contribution(_) | Event::Contributor(_) => return,
		};

		if let Err(error) = result {
			error!("Failed while projecting ProjectEvent {event}: {}", error);
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use mockall::predicate::eq;
	use rstest::*;
	use std::sync::Arc;

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
			.expect_upsert()
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
}
