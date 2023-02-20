use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::{GithubUserId, ProjectId};
use infrastructure::database::schema::pending_project_leader_invitations;
use serde::{Deserialize, Serialize};

use crate::domain::PendingProjectLeaderInvitationId;

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
	id: PendingProjectLeaderInvitationId,
	project_id: ProjectId,
	github_user_id: GithubUserId,
}

impl domain::Entity for PendingProjectLeaderInvitation {
	type Id = PendingProjectLeaderInvitationId;
}
