/// This module contains the `PendingProjectLeaderInvitation` struct. This struct represents a pending
/// project leader invitation in the application.
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::{GithubUserId, ProjectId};
use infrastructure::database::schema::pending_project_leader_invitations;
use serde::{Deserialize, Serialize};

use crate::domain::PendingProjectLeaderInvitationId;

/// Represents a pending project leader invitation.
#[derive(
	Default,
	Debug,
	Clone,
	Constructor,
	Getters,
	Dissolve,
	Insertable,
	Serialize,
	Deserialize,
	Queryable,
	AsChangeset,
	Identifiable,
)]
pub struct PendingProjectLeaderInvitation {
    /// The ID of the pending project leader invitation.
	id: PendingProjectLeaderInvitationId,
    /// The ID of the project associated with the pending project leader invitation.
	project_id: ProjectId,
    /// The ID of the GitHub user associated with the pending project leader invitation.
	github_user_id: GithubUserId,
}

impl domain::Entity for PendingProjectLeaderInvitation {
    /// The type of the entity ID used in the `PendingProjectLeaderInvitation`.
	type Id = PendingProjectLeaderInvitationId;
}