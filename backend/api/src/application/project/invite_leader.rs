use anyhow::Result;
use domain::{DomainError, GithubUserId, ProjectId};

use crate::{
	domain::{PendingProjectLeaderInvitation, PendingProjectLeaderInvitationId},
	infrastructure::database::PendingProjectLeaderInvitationsRepository,
};

pub struct Usecase {
	pending_leader_invitation_repository: PendingProjectLeaderInvitationsRepository,
}

impl Usecase {
	pub fn new(
		pending_leader_invitation_repository: PendingProjectLeaderInvitationsRepository,
	) -> Self {
		Self {
			pending_leader_invitation_repository,
		}
	}

	pub async fn invite_leader(
		&self,
		project_id: ProjectId,
		github_user_id: GithubUserId,
	) -> Result<PendingProjectLeaderInvitationId, DomainError> {
		let invitation = PendingProjectLeaderInvitation::new(
			PendingProjectLeaderInvitationId::new(),
			project_id,
			github_user_id,
		);

		self.pending_leader_invitation_repository.insert(&invitation)?;

		Ok(*invitation.id())
	}
}
