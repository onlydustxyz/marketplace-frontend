use anyhow::Result;

use domain::{DomainError, GithubUserId, ProjectId};

use crate::{
    domain::{PendingProjectLeaderInvitation, PendingProjectLeaderInvitationId},
    infrastructure::database::PendingProjectLeaderInvitationsRepository,
};

/// This struct represents a usecase for inviting leaders to a project.
pub struct Usecase {
    /// Repository for accessing pending leader invitations data.
    pending_leader_invitation_repository: PendingProjectLeaderInvitationsRepository,
}

impl Usecase {
    /// Creates a new instance of the usecase.
    ///
    /// # Arguments
    ///
    /// * `pending_leader_invitation_repository` - Repository for accessing pending leader invitations data.
    ///
    /// # Returns
    ///
    /// Returns a new `Usecase` instance.
    pub fn new(
        pending_leader_invitation_repository: PendingProjectLeaderInvitationsRepository,
    ) -> Self {
        Self {
            pending_leader_invitation_repository,
        }
    }

    /// Invites a leader to a project by inserting a new pending leader invitation to the repository.
    ///
    /// # Arguments
    ///
    /// * `project_id` - Project ID the invitation is for.
    ///
    /// * `github_user_id` - Github user ID of the user being invited.
    ///
    /// # Returns
    ///
    /// Returns a `PendingProjectLeaderInvitationId` on success, or a `DomainError` if the operation fails.
    #[instrument(skip(self))]
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