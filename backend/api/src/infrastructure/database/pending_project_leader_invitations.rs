use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::pending_project_leader_invitations::dsl, Client};

use crate::domain::PendingProjectLeaderInvitation;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(PendingProjectLeaderInvitation)]
#[table(dsl::pending_project_leader_invitations)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
