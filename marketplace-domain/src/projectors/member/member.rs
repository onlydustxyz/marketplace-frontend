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
					contributor_account,
				} => self.on_member_added(project_id, contributor_account),
				ProjectEvent::MemberRemoved {
					project_id,
					contributor_account,
				} => self.on_member_removed(project_id, contributor_account),
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
