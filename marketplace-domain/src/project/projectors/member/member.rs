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
		contributor_account: &ContributorAccount,
		is_lead_contributor: bool,
	) -> Result<(), ProjectMemberProjectionRepositoryError> {
		self.member_projection_repository.store(ProjectMemberProjection::new(
			project_id.clone(),
			contributor_account.clone(),
			is_lead_contributor.clone(),
		))
	}

	fn on_member_removed(
		&self,
		project_id: &ProjectId,
		contributor_account: &ContributorAccount,
	) -> Result<(), ProjectMemberProjectionRepositoryError> {
		self.member_projection_repository.delete(project_id, contributor_account)
	}
}

#[async_trait]
impl Projector<ProjectAggregate> for MemberProjector {
	async fn project(&self, event: &ProjectEvent) {
		let result = match event {
			ProjectEvent::MemberAdded {
				project_id,
				contributor_account,
			} => self.on_member_added(project_id, contributor_account, false),
			ProjectEvent::MemberRemoved {
				project_id,
				contributor_account,
			} => self.on_member_removed(project_id, contributor_account),
			ProjectEvent::LeadContributorAdded {
				project_id,
				contributor_account,
			} => self.on_member_added(project_id, contributor_account, true),
			ProjectEvent::LeadContributorRemoved {
				project_id,
				contributor_account,
			} => self.on_member_removed(project_id, contributor_account),
		};

		if let Err(error) = result {
			error!("Failed while projecting ProjectEvent {event}: {}", error);
		}
	}
}
