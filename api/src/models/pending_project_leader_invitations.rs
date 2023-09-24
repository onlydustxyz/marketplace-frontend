use diesel::Identifiable;
use domain::{GithubUserId, ProjectId};
use infrastructure::database::schema::pending_project_leader_invitations;
use serde::{Deserialize, Serialize};

create_new_id!(Id);

#[derive(
	Default,
	Debug,
	Clone,
	Insertable,
	Serialize,
	Deserialize,
	Queryable,
	Identifiable,
	ImmutableModel,
)]
pub struct PendingProjectLeaderInvitation {
	pub id: Id,
	pub project_id: ProjectId,
	pub github_user_id: GithubUserId,
}

impl Identifiable for PendingProjectLeaderInvitation {
	type Id = Id;

	fn id(self) -> Self::Id {
		self.id
	}
}
