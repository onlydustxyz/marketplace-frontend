use std::sync::Arc;

use anyhow::Result;
use domain::{DomainError, GithubUserId, ProjectId};
use infrastructure::database::ImmutableRepository;
use tracing::instrument;

use crate::models::*;

pub struct Usecase {
	pending_leader_invitation_repository:
		Arc<dyn ImmutableRepository<PendingProjectLeaderInvitation>>,
}

impl Usecase {
	pub fn new(
		pending_leader_invitation_repository: Arc<
			dyn ImmutableRepository<PendingProjectLeaderInvitation>,
		>,
	) -> Self {
		Self {
			pending_leader_invitation_repository,
		}
	}

	#[instrument(skip(self))]
	pub async fn invite_leader(
		&self,
		project_id: ProjectId,
		github_user_id: GithubUserId,
	) -> Result<PendingProjectLeaderInvitationId, DomainError> {
		let id = PendingProjectLeaderInvitationId::new();

		self.pending_leader_invitation_repository
			.insert(PendingProjectLeaderInvitation {
				id,
				project_id,
				github_user_id,
			})?;

		Ok(id)
	}
}
