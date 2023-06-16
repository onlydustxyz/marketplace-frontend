mod id;
mod repository;

use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::{GithubUserId, ProjectId};
use infrastructure::database::schema::pending_project_leader_invitations;
use serde::{Deserialize, Serialize};

pub use self::{id::Id, repository::Repository};

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
	id: Id,
	project_id: ProjectId,
	github_user_id: GithubUserId,
}

impl domain::Entity for PendingProjectLeaderInvitation {
	type Id = Id;
}
