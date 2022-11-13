use crate::{ContributorDiscordHandle, GithubUserId};
use serde::{Deserialize, Serialize};
use std::fmt::Display;
use uuid::Uuid;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	GithubAccountAssociated {
		user_id: Uuid,
		github_identifier: GithubUserId,
	},
	DiscordHandleRegistered {
		user_id: Uuid,
		discord_handle: ContributorDiscordHandle,
	},
}

impl Display for Event {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(&self).map_err(|_| std::fmt::Error)?
		)
	}
}
